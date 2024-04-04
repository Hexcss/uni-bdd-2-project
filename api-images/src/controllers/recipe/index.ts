import { Response } from 'express';
import { IRecipeImage, MulterRequest } from '../../utils/interfaces';
import { RecipeImage } from '../../models';
import { MongoService } from '../../services';

class RecipeImageController {
  static service = new MongoService<IRecipeImage>(RecipeImage);

  static async uploadImage(req: MulterRequest, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).send('No image file provided.');
      }
      const { recipe_id, imageName } = req.body;
      const newImage = await RecipeImageController.service.create({
        recipe_id,
        imageData: req.file.buffer,
        imageName,
      });
      res.status(201).json(newImage);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getImagesByRecipeId(req: MulterRequest, res: Response) {
    try {
      const { recipe_id } = req.params;
      const images = await RecipeImageController.service.find({ recipe_id });
      res.json(images);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async updateImage(req: MulterRequest, res: Response) {
    try {
      const { recipe_id } = req.params;
      const { imageName } = req.body;
      const updateData = {
        imageData: req.file?.buffer,
        imageName,
      };
      const updatedImage = await RecipeImageController.service.update(
        { recipe_id },
        updateData
      );
      if (!updatedImage) {
        return res.status(404).send('Image not found.');
      }
      res.json(updatedImage);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async deleteImage(req: MulterRequest, res: Response) {
    try {
      const { recipe_id } = req.params;
      const result = await RecipeImageController.service.delete({
        recipe_id,
      });
      if (result?.deletedCount === 0) {
        return res.status(404).send('Image not found.');
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default RecipeImageController;
