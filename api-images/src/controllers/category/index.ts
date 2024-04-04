import { Response } from 'express';
import { ICategoryImage, MulterRequest } from '../../utils/interfaces';
import { CategoryImage } from '../../models';
import { MongoService } from '../../services';
import { loggingMiddleware } from '../../middlewares';

class CategoryImageController {
  static service = new MongoService<ICategoryImage>(CategoryImage);

  static async uploadImage(req: MulterRequest, res: Response) {
    const { category_id, imageName } = req.body;
    try {
      if (!req.file) {
        loggingMiddleware.logger.warn(
          `Upload attempt without file by ${req.ip} for category ${category_id}`
        );
        return res.status(400).send('No image file provided.');
      }
      const newImage = await CategoryImageController.service.create({
        category_id,
        imageData: req.file.buffer,
        imageName,
      });
      loggingMiddleware.logger.info(
        `Image uploaded for category ${category_id}: ${imageName}`
      );
      res.status(201).json(newImage);
    } catch (error) {
      loggingMiddleware.logger.error(
        `Error uploading image for category ${category_id}: ${error.message}`
      );
      res.status(500).send(error.message);
    }
  }

  static async getImagesByCategoryId(req: MulterRequest, res: Response) {
    const { category_id } = req.params;
    try {
      const images = await CategoryImageController.service.find({
        category_id,
      });
      loggingMiddleware.logger.info(
        `Retrieved images for category ${category_id}`
      );
      res.json(images);
    } catch (error) {
      loggingMiddleware.logger.error(
        `Error retrieving images for category ${category_id}: ${error.message}`
      );
      res.status(500).send(error.message);
    }
  }

  static async updateImage(req: MulterRequest, res: Response) {
    const { category_id } = req.params;
    const { imageName } = req.body;
    try {
      if (!req.file) {
        loggingMiddleware.logger.warn(
          `Update attempt without file by ${req.ip} for category ${category_id}`
        );
        return res.status(400).send('No new image file provided for update.');
      }
      const updateData = {
        imageData: req.file.buffer,
        imageName,
      };
      const updatedImage = await CategoryImageController.service.update(
        { category_id },
        updateData
      );
      if (!updatedImage) {
        loggingMiddleware.logger.info(
          `Image not found for category ${category_id} during update.`
        );
        return res.status(404).send('Image not found.');
      }
      loggingMiddleware.logger.info(
        `Updated image for category ${category_id}: ${imageName}`
      );
      res.json(updatedImage);
    } catch (error) {
      loggingMiddleware.logger.error(
        `Error updating image for category ${category_id}: ${error.message}`
      );
      res.status(500).send(error.message);
    }
  }

  static async deleteImage(req: MulterRequest, res: Response) {
    const { category_id } = req.params;
    try {
      const result = await CategoryImageController.service.delete({
        category_id,
      });
      if (result?.deletedCount === 0) {
        loggingMiddleware.logger.info(
          `No image found for category ${category_id} during deletion.`
        );
        return res.status(404).send('Image not found.');
      }
      loggingMiddleware.logger.info(
        `Deleted image for category ${category_id}`
      );
      res.status(204).send();
    } catch (error) {
      loggingMiddleware.logger.error(
        `Error deleting image for category ${category_id}: ${error.message}`
      );
      res.status(500).send(error.message);
    }
  }
}

export default CategoryImageController;
