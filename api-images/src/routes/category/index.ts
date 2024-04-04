import express from 'express';
import fileUpload from 'express-fileupload';
import { CategoryImageController } from '../../controllers';
import { Request, Response } from 'express';

const router = express.Router();

router.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

router.post('/', (req: Request, res: Response) =>
  CategoryImageController.uploadImage(req, res)
);

router.get('/:category_id', CategoryImageController.getImagesByCategoryId);

router.put('/:category_id', (req: Request, res: Response) =>
  CategoryImageController.updateImage(req, res)
);

router.delete('/:category_id', CategoryImageController.deleteImage);

export default router;
