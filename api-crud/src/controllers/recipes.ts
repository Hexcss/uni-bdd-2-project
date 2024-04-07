
import { Request, Response } from 'express';
import { MongoService } from '../services';
import { RecipeModel } from '../models';

const recipeService = new MongoService(RecipeModel);

const getAllRecipes = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string;

  try {
    const {data, totalCount } = await recipeService.find(
      {},
      page,
      limit,
      null,
      null,
      search
    );
    res.json({data, totalCount});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipe = await recipeService.create(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipe = await recipeService.findOne({id: req.params.id});
    if (!recipe) {
      res.status(404).send('Recipe not found');
      return;
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).send(error.message);
  }
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
