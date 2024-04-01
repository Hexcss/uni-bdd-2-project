import { Express } from 'express';
import CategoryRoutes from './categories';
import TagRoutes from './tags';
import RecipeRoutes from './recipes';
import { errorHandler } from '../middlewares';

const configureRoutes = (app: Express): void => {
  app.use('/api', CategoryRoutes);
  app.use('/api', TagRoutes);
  app.use('/api', RecipeRoutes);
  app.use(errorHandler);
};

export default configureRoutes;
