import { Request, Response } from 'express';
import { MongoService } from '../services';
import { TagModel } from '../models';

const tagService = new MongoService(TagModel);

const getAllTags = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string; // Extract search term from query parameters

  try {
    const { data, totalCount } = await tagService.find(
      {},
      page,
      limit,
      null,
      null,
      search
    );
    res.json({ data, totalCount });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createTag = async (req: Request, res: Response): Promise<void> => {
  CrudServices.create(req, res, 'Tag');
};

const getTagById = async (req: Request, res: Response) => {
  CrudServices.getById(req, res, 'Tag');
};

const updateTag = async (req: Request, res: Response) => {
  CrudServices.update(req, res, 'Tag');
};

const deleteTag = async (req: Request, res: Response) => {
  CrudServices.deleteById(req, res, 'Tag');
};

const tagController = {
  getAllTags,
  createTag,
  getTagById,
  updateTag,
  deleteTag,
};

export default tagController;
