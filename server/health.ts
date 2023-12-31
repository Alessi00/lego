import config from '../config/env';
import type { Request, Response } from 'express';

export default function healthCheck(req: Request, res: Response) {
  const log = req.app.get('log');
  fetch(config.baseUrl, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        res.sendStatus(200);
      } else {
        log.warn('unhealthy_response', response);
        res.sendStatus(500);
      }
    })
    .catch((err) => {
      log.warn('unhealthy', err);
      res.sendStatus(500);
    });
}
