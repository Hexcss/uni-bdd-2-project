import Category from '../models/category'
import {Request, Response} from 'express';

const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.json(categories);

  } catch (error) {
    res.status(500).send({message: error.message});
  }
}


const createCategory = async (req: Request, res: Response) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ message: 'Categoría no encontrada.' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findOneAndUpdate({ id }, req.body, {
      new: true,
    });
    if (!updatedCategory) {
      return res.status(404).send({ message: 'Categoría no encontrada.' });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findOneAndDelete({ id });
    if (!deletedCategory) {
      return res.status(404).send({ message: 'Categoría no encontrada.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const categoriesController = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
}

export default categoriesController;
