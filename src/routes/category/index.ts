import express from 'express';
import fileUpload from 'express-fileupload';
import { CategoryImageController } from '../../controllers';
import { Request, Response } from 'express';
import { authMiddleware } from '../../middlewares';

const router = express.Router();

router.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

router.post('/', authMiddleware, (req: Request, res: Response) =>
  CategoryImageController.uploadImage(req, res)
);

router.get('/:category_id', CategoryImageController.getImagesByCategoryId);

router.put('/:category_id', authMiddleware, (req: Request, res: Response) =>
  CategoryImageController.updateImage(req, res)
);

router.delete(
  '/:category_id',
  authMiddleware,
  CategoryImageController.deleteImage
);

export default router;
