import tagController from "../controllers/tags";
import { validateTag } from "../middlewares/validation";
import express from "express";

const router = express.Router();

router.get('/tags', tagController.getAllTags);
router.post('/tags', validateTag, tagController.createTag);
router.get('/tags/:id', tagController.getTagById);
router.put('/tags/:id', validateTag, tagController.updateTag);
router.delete('/tags/:id', tagController.deleteTag);

export default router;