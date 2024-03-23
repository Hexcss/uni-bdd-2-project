import Recipe from '../models/recipe';
import express, {Request, Response} from 'express';

const getAllRecipes = async (req: Request, res: Response): Promise<void> => {
    let query: any = {};
    if (req.query.category) {
        query.category_id = req.query.category;
    }
    try {
        const recipes = await Recipe.find(query);
        res.status(200).json(recipes);

    } catch(error) {
        res.status(500).send({message: error.message});
    }
}

const createRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const newRecipe = new Recipe(req.body);
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(400).send({
            message: 'Missing required fields in the recipe object or other bad request error',
            error: error.message,
        });
    }

}

const getRecipe = async (req: Request, res: Response) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) {
        return res
          .status(404)
          .send({ message: 'Recipe with given ID does not exist.' });
      }
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
}

const updateRecipe = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedRecipe = await Recipe.findOneAndUpdate({ id }, req.body, {
        new: true,
      });
      if (!updatedRecipe) {
        return res.status(404).send({ message: 'Receta no encontrada.' });
      }
      res.json(updatedRecipe);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
}

const deleteRecipe = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedRecipe = await Recipe.findOneAndDelete({ id });
      if (!deletedRecipe) {
        return res.status(404).send({ message: 'Receta no encontrada.' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
}

const recipesController = {
    getAllRecipes,
    createRecipe,
    getRecipe,
    updateRecipe,
    deleteRecipe,
}

export default recipesController;


  



