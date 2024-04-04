import express from 'express';
import fileUpload from 'express-fileupload';
import { RecipeImageController } from '../../controllers';

const router = express.Router();

router.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

router.post('/', (req, res) => RecipeImageController.uploadImage(req, res));
router.get('/:recipe_id', RecipeImageController.getImagesByRecipeId);
router.put('/:recipe_id', (req, res) =>
  RecipeImageController.updateImage(req, res)
);
router.delete('/:recipe_id', RecipeImageController.deleteImage);

export default router;
