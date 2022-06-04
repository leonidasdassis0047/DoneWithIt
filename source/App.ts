import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import http from 'http';
import { IController } from './utils/interfaces/';
import { ErrorHandler } from './middlewares';

export default class Application {
  private expressApp: express.Application;

  constructor(private port: number, private controllers?: IController[]) {
    this.expressApp = express();

    this.initialiseAppMiddlewares();
    this.initialiseDatabaseConnection();
    this.initialiseControllers();

    this.initialiseErrorHandling();
  }

  public startListening = (): http.Server => {
    return this.expressApp.listen(this.port, () => console.log('server on'));
  };

  private initialiseAppMiddlewares = () => {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: true }));
    this.expressApp.use(cors());
    this.expressApp.use(helmet());
    this.expressApp.use(compression());
    this.expressApp.use(morgan('common'));
  };

  private initialiseDatabaseConnection = () => {
    mongoose
      .connect('mongodb://localhost:27017', { dbName: 'cryptoApp' })
      .then(() => {
        console.log('database connected');
      })
      .catch((error) => console.log(error.message));
  };

  private initialiseControllers = () => {
    this.controllers?.forEach((controller) => {
      this.expressApp.use('/', controller.router);
    });
  };

  private initialiseErrorHandling = () => {
    this.expressApp.use(ErrorHandler);
  };
}
