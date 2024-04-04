import mongoose from 'mongoose';
import { ICategoryImage, IRecipeImage } from '../utils/interfaces';

const categoryImageSchema = new mongoose.Schema({
  category_id: {
    type: String,
    ref: 'Category',
    required: true,
  },
  imageData: { type: Buffer, required: true },
});

const recipeImageSchema = new mongoose.Schema({
  recipe_id: {
    type: String,
    ref: 'Recipe',
    required: true,
  },
  imageData: { type: Buffer, required: true },
});

const CategoryImage = mongoose.model<ICategoryImage>(
  'CategoryImage',
  categoryImageSchema
);
const RecipeImage = mongoose.model<IRecipeImage>(
  'RecipeImage',
  recipeImageSchema
);

export { CategoryImage, RecipeImage };
