import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../utils/types';

const categorySchema: Schema = new Schema({
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
});

const Category = mongoose.model<ICategory>(
  'Category',
  categorySchema,
  'categorys'
);
export default Category;
