import { Request, Response } from 'express';
import CrudServices from '../services/crudService';

const getAllRecipes = async (req: Request, res: Response): Promise<void> => {
  CrudServices.getAll(req, res, 'Recipe');
};

const createRecipe = async (req: Request, res: Response): Promise<void> => {
  CrudServices.create(req, res, 'Recipe');
};

const getRecipe = async (req: Request, res: Response) => {
  CrudServices.getById(req, res, 'Recipe');
};

const updateRecipe = async (req: Request, res: Response) => {
  CrudServices.update(req, res, 'Recipe');
};

const deleteRecipe = async (req: Request, res: Response) => {
  CrudServices.deleteById(req, res, 'Recipe');
};

const recipesController = {
  getAllRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};

export default recipesController;
