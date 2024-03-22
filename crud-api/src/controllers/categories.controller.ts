import Category from '../models/category.model.js';
import {Request, Response} from 'express';

const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.json(categories);

  } catch (error) {
    res.status(500).send({message: error.message});
  }
}
