import { Router } from 'express';
import multer from 'multer';
import { CategoryImageController } from '../../controllers';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), CategoryImageController.uploadImage);

router.get('/:category_id', CategoryImageController.getImagesByCategoryId);

router.put(
  '/:category_id',
  upload.single('image'),
  CategoryImageController.updateImage
);

router.delete('/:category_id', CategoryImageController.deleteImage);

export default router;
