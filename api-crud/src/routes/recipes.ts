import recipesController from '../controllers/recipes';
import { authMiddleware } from '../middlewares';
import validationMiddleware from '../middlewares/validation';
import express from 'express';

const router = express.Router();

router.get('/recipes', recipesController.getAllRecipes);
router.post(
  '/recipes',
  authMiddleware,
  validationMiddleware.validateRecipe,
  recipesController.createRecipe
);
router.get('/recipes/:id', recipesController.getRecipe);
router.put(
  '/recipes/:id',
  authMiddleware,
  validationMiddleware.validateRecipe,
  recipesController.updateRecipe
);
router.delete('/recipes/:id', authMiddleware, recipesController.deleteRecipe);

export default router;
