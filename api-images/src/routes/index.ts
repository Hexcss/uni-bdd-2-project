import { Express } from 'express';
import { errorHandler } from '../middlewares';

const configureRoutes = (app: Express): void => {
  app.use(errorHandler);
};

export default configureRoutes;
