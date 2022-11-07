import { StaticRouter } from 'react-router';
import { Request, Response } from 'express';
import RouteConfig from '../app/routes';
import { ReactReduxContext } from 'react-redux';
import * as Sentry from '@sentry/node';
import configureStore from '../app/utils/configureStore';
import type { State } from '../app/types';
import '../app/types';
import pageRenderer from './pageRenderer';
import { prepare } from '@webkom/react-prepare';
import { HelmetProvider } from 'react-helmet-async';
import { ReactElement } from 'react';
const serverSideTimeoutInMs = 4000;
export const helmetContext: any = {}; // AntiPattern because of babel
// https://github.com/babel/babel/issues/3083

class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}

const isTimeoutError = (error: unknown): error is TimeoutError =>
  error instanceof TimeoutError;

const prepareWithTimeout = (app): Promise<string> =>
  Promise.race([
    prepare(app),
    new Promise((resolve) => {
      setTimeout(resolve, serverSideTimeoutInMs);
    }).then(() => {
      throw new TimeoutError(
        'React prepare timeout when server side rendering.'
      );
    }),
  ]);

const createServerSideRenderer = (req: Request, res: Response) => {
  const render = (
    app?: ReactElement,
    state: State | Record<string, never> = Object.freeze({}),
    preparedStateCode?: string
  ) => {
    return res.send(
      pageRenderer({
        app,
        state,
        preparedStateCode,
      })
    );
  };

  const context: Record<string, any> = {};
  const log = req.app.get('log');

  const ServerConfig = ({
    req,
    context,
  }: {
    req: Request;
    context: { [key: string]: any } & {
      status?: string;
      url?: string;
    };
  }) => (
    <StaticRouter location={req.url} context={context}>
      <RouteConfig />
    </StaticRouter>
  );

  const store = configureStore(
    {},
    {
      Sentry,
      getCookie: (key) => req.cookies[key],
    }
  );
  const providerData = {
    store,
    storeState: store.getState(),
  };
  const unsubscribe = store.subscribe(() => {
    const newStoreState = store.getState();

    // If the value is the same, skip the unnecessary state update.
    if (providerData.storeState === newStoreState) {
      return undefined;
    }

    providerData.storeState = newStoreState;
  });
  const app = (
    <HelmetProvider context={helmetContext}>
      <ReactReduxContext.Provider value={providerData}>
        <ServerConfig req={req} context={context} />
      </ReactReduxContext.Provider>
    </HelmetProvider>
  );

  const reportError = (error: Error) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const err = error.error ? error.payload : error;
      log.error(err, 'render_error');
      Sentry.captureException(err);
    } catch (e) {
      //
    }
  };

  const respond = (preparedStateCode?: string) => {
    if (context.url) {
      return res.redirect(302, context.url);
    }

    const state: State = store.getState();
    // TODO: remove workaround when redux-form is replaced
    state.form = {}; // Lego-editor doesn't initialize correctly when redux-form is initialized by ssr (react-prepare)

    const statusCode = state.router.statusCode || 200;
    res.status(statusCode);
    return render(app, state, preparedStateCode);
  };

  prepareWithTimeout(app)
    .then(
      (preparedStateCode) => respond(preparedStateCode),
      (error) => {
        reportError(error);
        if (isTimeoutError(error)) {
          return render();
        }

        respond();
      }
    )
    .catch((error) => {
      reportError(error);
      render();
    })
    .then(unsubscribe);
};

export default createServerSideRenderer;