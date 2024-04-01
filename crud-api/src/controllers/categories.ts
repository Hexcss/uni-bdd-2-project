import { Request, Response } from 'express';
import { MongoService } from '../services';
import { CategoryModel } from '../models';

const categoryService = new MongoService(CategoryModel);

const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await categoryService.find({});
    res.json(categories);
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
      { _id: req.params.id },
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
    const result = await categoryService.delete({ _id: req.params.id });
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
