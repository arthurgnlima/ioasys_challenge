import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction, Application } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';

import AppError from '../../errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

class App {
  public server: Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares(): void {
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use(routes);
  }

  private exceptionHandler() {
    this.server.use(errors());

    this.server.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return response
            .status(err.statusCode)
            .json({ status: 'error', message: err.message });
        }

        console.log(err.message);

        return response
          .status(500)
          .json({ status: 'error', message: 'Internal Server Error' });
      },
    );
  }
}

export default new App().server;
