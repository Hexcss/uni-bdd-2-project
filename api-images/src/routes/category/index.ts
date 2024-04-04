import { Router } from 'express';
import multer from 'multer';
import { validationMiddleware } from '../../middlewares';
import { CategoryImageController } from '../../controllers';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  '/',
  upload.single('image'),
  validationMiddleware.validateCategoryImage,
  CategoryImageController.uploadImage
);

router.get('/:category_id', CategoryImageController.getImagesByCategoryId);

router.put(
  '/:image_id',
  upload.single('image'),
  CategoryImageController.updateImage
);

router.delete('/:image_id', CategoryImageController.deleteImage);

export default router;
