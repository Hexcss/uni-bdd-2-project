import mongoose, {Schema, Document} from 'mongoose';

interface IRecipe extends Document {
    id: string;
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
    category_id: string[];
    tag_ids: string[];
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
}

const recipeSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
      },
    title: {
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
    },
    tag_ids: [
        {
          type: String,
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
    
    

