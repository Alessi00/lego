import type { RootState } from 'app/store/createRootReducer';
import type {
  AsyncActionType,
  AsyncActionTypeArray,
  PromiseAction,
} from 'app/types';
import type { Middleware } from '@reduxjs/toolkit';

function extractTypes(
  types: AsyncActionType | AsyncActionTypeArray
): AsyncActionTypeArray {
  if (Array.isArray(types)) {
    return types;
  }

  return [types.BEGIN, types.SUCCESS, types.FAILURE];
}

export default function promiseMiddleware(): Middleware<
  <T>(action: PromiseAction<T>) => Promise<T>,
  RootState
> {
  return () => (next) => (action) => {
    if (typeof action !== 'object' || !action.types) {
      return next(action);
    }

    const { types, payload, promise, meta } = action as PromiseAction<unknown>;
    const [PENDING, SUCCESS, FAILURE] = extractTypes(types);
    next({
      type: PENDING,
      payload,
      meta,
    });
    return new Promise((resolve, reject) => {
      promise.then(
        (payload) =>
          resolve(
            next({
              type: SUCCESS,
              payload,
              success: true,
              meta,
            })
          ),
        (error: boolean) =>
          reject(
            next({
              type: FAILURE,
              payload: error,
              error: true,
              meta,
            })
          )
      );
    });
  };
}
