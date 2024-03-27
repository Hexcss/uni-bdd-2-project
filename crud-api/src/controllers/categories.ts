
import {Request, Response} from 'express';
import CrudServices from '../services/crudService';


const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  CrudServices.getAll(req, res, "Category");
}


const createCategory = async (req: Request, res: Response) => {
  CrudServices.create(req, res, "Category");
}



const getCategoryById = async (req: Request, res: Response) => {
  CrudServices.getById(req, res, "Category");
}

const updateCategory = async (req: Request, res: Response) => {
  CrudServices.update(req, res, "Category");
}

const deleteCategory = async (req: Request, res: Response) => {
 CrudServices.deleteById(req, res, "Category");
}

const categoriesController = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
}

export default categoriesController;
