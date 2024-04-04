import { Router } from 'express';
import multer from 'multer';
import { RecipeImageController } from '../../controllers';
import { validationMiddleware } from '../../middlewares';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  '/',
  upload.single('image'),
  validationMiddleware.validateRecipeImage,
  RecipeImageController.uploadImage
);

router.get('/:recipe_id', RecipeImageController.getImagesByRecipeId);

router.put(
  '/:image_id',
  upload.single('image'),
  RecipeImageController.updateImage
);

router.delete('/:image_id', RecipeImageController.deleteImage);

export default router;
