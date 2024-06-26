import { Express } from 'express';
import categoryImagesRoutes from './category';
import recipeImagesRoutes from './recipe';
import { errorHandler } from '../middlewares';

const configureRoutes = (app: Express): void => {
  app.use(errorHandler);
  app.use('/api/category-images', categoryImagesRoutes);
  app.use('/api/recipe-images', recipeImagesRoutes);
};

export default configureRoutes;
