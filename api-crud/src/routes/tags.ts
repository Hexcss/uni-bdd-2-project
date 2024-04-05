import tagController from '../controllers/tags';
import validationMiddleware from '../middlewares/validation';
import express from 'express';
import authMiddleware from '../middlewares/auth/index';

const router = express.Router();

router.get('/tags', tagController.getAllTags);
router.post(
  '/tags',
  authMiddleware,
  validationMiddleware.validateTag,
  tagController.createTag
);
router.get('/tags/:id', tagController.getTagById);
router.put(
  '/tags/:id',
  authMiddleware,
  validationMiddleware.validateTag,
  tagController.updateTag
);
router.delete('/tags/:id', authMiddleware, tagController.deleteTag);

export default router;
