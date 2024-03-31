import { Document } from "mongoose";

interface ICategory extends Document {
    id: string;
    name: string;
    description: string;
}

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

interface ITag extends Document {
    id: string;
    name: string;
}

export {ICategory, IRecipe, ITag};
