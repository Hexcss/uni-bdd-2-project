import { Request, Response } from 'express';
import { ICategoryImage } from '../../utils/interfaces';
import { CategoryImage } from '../../models';
import { MongoService } from '../../services';
import { loggingMiddleware } from '../../middlewares';
import fs from 'fs/promises'; // Using the Promise-based version of 'fs'

class CategoryImageController {
  static service = new MongoService<ICategoryImage>(CategoryImage);

  static async uploadImage(req: Request, res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { category_id, imageName } = req.body;
    try {
      if (
        !req.files ||
        Object.keys(req.files).length === 0 ||
        !req.files.image
      ) {
        loggingMiddleware.logger.warn(
          `Upload attempt without file by ${req.ip} for category ${category_id}`
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
          `No file data found for category ${category_id}`
        );
        return res.status(400).send('File data could not be found.');
      }

      const newImage = await CategoryImageController.service.create({
        category_id,
        imageData: fileData,
        imageName: imageName || imageFile.name,
      });

      loggingMiddleware.logger.info(
        `Image uploaded for category ${category_id}: ${imageName || imageFile.name}`
      );
      res.status(201).json(newImage);
    } catch (error) {
      loggingMiddleware.logger.error(
        `Error uploading image for category ${category_id}: ${error.message}`
      );
      res.status(500).send(error.message);
    }
  }

  static async getImagesByCategoryId(req: Request, res: Response) {
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

  static async updateImage(req: Request, res: Response) {
    const { category_id } = req.params;
    const { imageName } = req.body;
    try {
      if (
        !req.files ||
        Object.keys(req.files).length === 0 ||
        !req.files.image
      ) {
        loggingMiddleware.logger.warn(
          `Update attempt without file by ${req.ip} for category ${category_id}`
        );
        return res.status(400).send('No new image file provided for update.');
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
          `No file data found for category ${category_id}`
        );
        return res.status(400).send('File data could not be found.');
      }

      const updateData = {
        imageData: fileData,
        imageName: imageName || imageFile.name,
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
        `Updated image for category ${category_id}: ${imageName || imageFile.name}`
      );
      res.json(updatedImage);
    } catch (error) {
      loggingMiddleware.logger.error(
        `Error updating image for category ${category_id}: ${error.message}`
      );
      res.status(500).send(error.message);
    }
  }

  static async deleteImage(req: Request, res: Response) {
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
