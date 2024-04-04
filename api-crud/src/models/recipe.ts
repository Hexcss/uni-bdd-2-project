import mongoose, { Schema } from 'mongoose';
import { IRecipe } from '../utils/types';

const recipeSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  steps: [
    {
      type: String,
      required: true,
    },
  ],
  category_id: {
    type: String,
    required: true,
    ref: 'Category',
  },
  tag_ids: [
    {
      type: String,
      ref: 'Tag',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  authorId: {
    type: String,
    required: true,
  },
});

const Recipe = mongoose.model<IRecipe>('Recipe', recipeSchema);
export default Recipe;
