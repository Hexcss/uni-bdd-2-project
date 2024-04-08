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
