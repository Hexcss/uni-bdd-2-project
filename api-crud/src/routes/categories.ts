import categoriesController from '../controllers/categories';
import { authMiddleware } from '../middlewares';
import validationMiddleware from '../middlewares/validation';
import express from 'express';

const router = express.Router();

router.get('/categories', categoriesController.getAllCategories);
router.post(
  '/categories',
  authMiddleware,
  validationMiddleware.validateCategory,
  categoriesController.createCategory
);
router.get('/categories/:id', categoriesController.getCategoryById);
router.put(
  '/categories/:id',
  authMiddleware,
  validationMiddleware.validateCategory,
  categoriesController.updateCategory
);
router.delete(
  '/categories/:id',
  authMiddleware,
  categoriesController.deleteCategory
);

export default router;
