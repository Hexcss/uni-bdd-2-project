import { Request, Response } from 'express';
import { MongoService } from '../services';
import { CategoryModel } from '../models';

const categoryService = new MongoService(CategoryModel);

const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string; // Extract search term from query parameters

  try {
    const { data, totalCount } = await categoryService.find(
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

const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await categoryService.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await categoryService.findOne({ id: req.params.id });
    if (!category) {
      res.status(404).send('Category not found');
      return;
    }
    res.json(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await categoryService.update(
      { id: req.params.id },
      req.body
    );
    if (!category) {
      res.status(404).send('Category not found');
      return;
    }
    res.json(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await categoryService.delete({ id: req.params.id });
    if (result?.deletedCount === 0) {
      res.status(404).send('Category not found');
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const categoriesController = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};

export default categoriesController;
