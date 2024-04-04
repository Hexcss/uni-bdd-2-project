import { Express } from 'express';
import categoryImagesRoutes from './category';
import recipeImagesRoutes from './recipe';
import { authMiddleware, errorHandler } from '../middlewares';

const configureRoutes = (app: Express): void => {
  app.use(authMiddleware);
  app.use('/api/category-images', categoryImagesRoutes);
  app.use('/api/recipe-images', recipeImagesRoutes);
  app.use(errorHandler);
};

export default configureRoutes;
