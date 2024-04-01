import recipesController from '../controllers/recipes';
import validationMiddleware from '../middlewares/validation';
import express from 'express';

const router = express.Router();

router.get('/recipes', recipesController.getAllRecipes);
router.post(
  '/recipes',
  validationMiddleware.validateRecipe,
  recipesController.createRecipe
);
router.get('/recipes/:id', recipesController.getRecipe);
router.put(
  '/recipes/:id',
  validationMiddleware.validateRecipe,
  recipesController.updateRecipe
);
router.delete('/recipes/:id', recipesController.deleteRecipe);

export default router;
