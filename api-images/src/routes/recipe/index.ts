import { Router } from 'express';
import multer from 'multer';
import { RecipeImageController } from '../../controllers';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), RecipeImageController.uploadImage);

router.get('/:recipe_id', RecipeImageController.getImagesByRecipeId);

router.put(
  '/:recipe_id',
  upload.single('image'),
  RecipeImageController.updateImage
);

router.delete('/:recipe_id', RecipeImageController.deleteImage);

export default router;
