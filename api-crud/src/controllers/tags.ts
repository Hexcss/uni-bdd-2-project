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
  try {
    const tag = await tagService.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getTagById = async (req: Request, res: Response) => {
  try {
    const tag = await tagService.findOne({id: req.params.id});
    if (!tag) {
      res.status(404).send('Tag not found');
      return;
    }
    res.json(tag);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateTag = async (req: Request, res: Response) => {
  try {
    const tag = await tagService.update(
      {id: req.params.id},
      req.body
    );
    if (!tag) {
      res.status(404).send('Tag not found');
      return;
    }
    res.json(tag);
  } catch (error) {
    res.status(500).send(error.message);
  }
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
