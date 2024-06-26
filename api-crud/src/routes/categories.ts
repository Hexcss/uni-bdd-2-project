import categoriesController from '../controllers/categories';
import validationMiddleware from '../middlewares/validation';
import express from 'express';

const router = express.Router();

router.get('/categories', categoriesController.getAllCategories);
router.post(
  '/categories',
  validationMiddleware.validateCategory,
  categoriesController.createCategory
);
router.get('/categories/:id', categoriesController.getCategoryById);
router.put(
  '/categories/:id',
  validationMiddleware.validateCategory,
  categoriesController.updateCategory
);
router.delete('/categories/:id', categoriesController.deleteCategory);

export default router;
