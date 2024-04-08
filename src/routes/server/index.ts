import { Router, Request, Response } from 'express';
import { ICategoryImage, IRecipeImage } from '../../utils/interfaces';
import { MongoService } from '../../services';
import { CategoryImage, RecipeImage } from '../../models';

const router = Router();

const recipeImageService = new MongoService<IRecipeImage>(RecipeImage);
const categoryImageService = new MongoService<ICategoryImage>(CategoryImage);

router.get('/recipe-images/:recipeId', async (req: Request, res: Response) => {
  const recipeId = req.params.recipeId;
  const image = await recipeImageService.findOne({ recipe_id: recipeId });

  if (!image) {
    return res.status(404).send('Image not found');
  }

  const buffer = image.imageData;
  const mimeType = 'image/webp';
  res.setHeader('Content-Type', mimeType);
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.send(buffer);
});

router.get(
  '/category-images/:categoryId',
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const image = await categoryImageService.findOne({
      category_id: categoryId,
    });

    if (!image) {
      return res.status(404).send('Image not found');
    }

    const buffer = image.imageData;
    const mimeType = 'image/webp';
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.send(buffer);
  }
);

export default router;
