import { Response } from 'express';
import { IRecipeImage, MulterRequest } from '../../utils/interfaces';
import { RecipeImage } from '../../models';
import { MongoService } from '../../services';
import { loggingMiddleware } from '../../middlewares';

class RecipeImageController {
  static service = new MongoService<IRecipeImage>(RecipeImage);

  static async uploadImage(req: MulterRequest, res: Response) {
    const { recipe_id, imageName } = req.body;
    try {
      if (!req.file) {
        loggingMiddleware.logger.warn(
          `Upload attempt without file by ${req.ip}`
        );
        return res.status(400).send('No image file provided.');
      }

      const newImage = await RecipeImageController.service.create({
        recipe_id,
        imageData: req.file.buffer,
        imageName,
      });

      loggingMiddleware.logger.info(
        `Image uploaded for recipe ${recipe_id}: ${imageName}`
      );
      res.status(201).json(newImage);
    } catch (error) {
      loggingMiddleware.logger.error(
        `Error uploading image for recipe ${recipe_id}: ${error.message}`
      );
      res.status(500).send(error.message);
    }
  }

  static async getImagesByRecipeId(req: MulterRequest, res: Response) {
    const { recipe_id } = req.params;
    try {
      const images = await RecipeImageController.service.find({ recipe_id });
      loggingMiddleware.logger.info(`Retrieved images for recipe ${recipe_id}`);
      res.json(images);
    } catch (error) {
      loggingMiddleware.logger.error(
        `Error retrieving images for recipe ${recipe_id}: ${error.message}`
      );
      res.status(500).send(error.message);
    }
  }

  static async updateImage(req: MulterRequest, res: Response) {
    const { recipe_id } = req.params;
    const { imageName } = req.body;
    try {
      const updateData = {
        imageData: req.file?.buffer,
        imageName,
      };

      const updatedImage = await RecipeImageController.service.update(
        { recipe_id },
        updateData
      );

      if (!updatedImage) {
        loggingMiddleware.logger.info(
          `Image not found for recipe ${recipe_id} during update.`
        );
        return res.status(404).send('Image not found.');
      }

      loggingMiddleware.logger.info(
        `Updated image for recipe ${recipe_id}: ${imageName}`
      );
      res.json(updatedImage);
    } catch (error) {
      loggingMiddleware.logger.error(
        `Error updating image for recipe ${recipe_id}: ${error.message}`
      );
      res.status(500).send(error.message);
    }
  }

  static async deleteImage(req: MulterRequest, res: Response) {
    const { recipe_id } = req.params;
    try {
      const result = await RecipeImageController.service.delete({ recipe_id });

      if (result?.deletedCount === 0) {
        loggingMiddleware.logger.info(
          `Image not found for recipe ${recipe_id} during deletion.`
        );
        return res.status(404).send('Image not found.');
      }

      loggingMiddleware.logger.info(`Deleted image for recipe ${recipe_id}`);
      res.status(204).send();
    } catch (error) {
      loggingMiddleware.logger.error(
        `Error deleting image for recipe ${recipe_id}: ${error.message}`
      );
      res.status(500).send(error.message);
    }
  }
}

export default RecipeImageController;
