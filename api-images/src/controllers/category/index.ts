import { Response } from 'express';
import { ICategoryImage, MulterRequest } from '../../utils/interfaces';
import { CategoryImage } from '../../models';
import { MongoService } from '../../services';

class CategoryImageController {
  static service = new MongoService<ICategoryImage>(CategoryImage);

  static async uploadImage(req: MulterRequest, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).send('No image file provided.');
      }
      const { category_id } = req.body;
      const newImage = await CategoryImageController.service.create({
        category_id,
        imageData: req.file.buffer,
      });
      res.status(201).json(newImage);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getImagesByCategoryId(req: MulterRequest, res: Response) {
    try {
      const { category_id } = req.params;
      const images = await CategoryImageController.service.find({
        category_id,
      });
      res.json(images);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async updateImage(req: MulterRequest, res: Response) {
    try {
      const { category_id } = req.params;
      const updateData = { imageData: req.file?.buffer };
      const updatedImage = await CategoryImageController.service.update(
        { category_id },
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
      const { category_id } = req.params;
      const result = await CategoryImageController.service.delete({
        category_id,
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

export default CategoryImageController;
