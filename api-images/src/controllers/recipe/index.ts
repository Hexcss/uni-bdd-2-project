import { Request, Response } from 'express';
import { IRecipeImage } from '../../utils/interfaces';
import { RecipeImage } from '../../models';
import { MongoService } from '../../services';
import { loggingMiddleware } from '../../middlewares';
import fs from 'fs/promises';

class RecipeImageController {
  static service = new MongoService<IRecipeImage>(RecipeImage);

  static async uploadImage(req: Request, res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { recipe_id } = (req as any).rawBody;
    try {
      if (
        !req.files ||
        Object.keys(req.files).length === 0 ||
        !req.files.image
      ) {
        loggingMiddleware.logger.warn(
          `Upload attempt without file by ${req.ip} for recipe ${recipe_id}`
        );
        return res.status(400).send('No image file provided.');
      }

      let imageFile = req.files.image;

      if (Array.isArray(imageFile)) {
        imageFile = imageFile[0];
      }
      let fileData: Buffer;

      if (imageFile.tempFilePath) {
        fileData = await fs.readFile(imageFile.tempFilePath);
      } else if (imageFile.data) {
        fileData = imageFile.data;
      } else {
        loggingMiddleware.logger.error(
          `No file data found for recipe ${recipe_id}`
        );
        return res.status(400).send('File data could not be found.');
      }

      const newImage = await RecipeImageController.service.create({
        recipe_id,
        imageData: fileData,
        imageName: imageFile.name,
      });

      loggingMiddleware.logger.info(
        `Image uploaded for recipe ${recipe_id}: ${imageFile.name}`
      );
      res.status(201).json(newImage);
    } catch (error) {
      loggingMiddleware.logger.error(
        `Error uploading image for recipe ${recipe_id}: ${error.message}`
      );
      res.status(500).send(error.message);
    }
  }

  static async getImagesByRecipeId(req: Request, res: Response) {
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

  static async updateImage(req: Request, res: Response) {
    const { recipe_id } = req.params;
    const { imageName } = req.body;
    try {
      if (
        !req.files ||
        Object.keys(req.files).length === 0 ||
        !req.files.image
      ) {
        loggingMiddleware.logger.warn(
          `Update attempt without file by ${req.ip} for recipe ${recipe_id}`
        );
        return res.status(400).send('No image file provided for update.');
      }

      let imageFile = req.files.image;

      if (Array.isArray(imageFile)) {
        imageFile = imageFile[0];
      }

      let fileData: Buffer;

      if (imageFile.tempFilePath) {
        fileData = await fs.readFile(imageFile.tempFilePath);
      } else if (imageFile.data) {
        fileData = imageFile.data;
      } else {
        loggingMiddleware.logger.error(
          `No file data found for recipe ${recipe_id}`
        );
        return res.status(400).send('File data could not be found.');
      }

      const updateData = {
        imageData: fileData,
        imageName: imageName || imageFile.name,
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
        `Updated image for recipe ${recipe_id}: ${imageName || imageFile.name}`
      );
      res.json(updatedImage);
    } catch (error) {
      loggingMiddleware.logger.error(
        `Error updating image for recipe ${recipe_id}: ${error.message}`
      );
      res.status(500).send(error.message);
    }
  }

  static async deleteImage(req: Request, res: Response) {
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
