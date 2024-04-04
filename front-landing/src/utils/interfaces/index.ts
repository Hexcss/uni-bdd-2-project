export interface ICategoryImage extends Document {
  category_id: string;
  imageData: Buffer;
  imageName: string;
}

export interface IRecipeImage extends Document {
  recipe_id: string;
  imageData: Buffer;
  imageName: string;
}

export interface IRecipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  tag_ids: string[];
  steps: string[];
  category_id: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
}

export interface ICategory {
  id: string;
  name: string;
  description?: string;
}

export interface ITag {
  id: string;
  name: string;
}
