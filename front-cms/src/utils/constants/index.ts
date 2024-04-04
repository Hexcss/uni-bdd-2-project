import { ICategory, IRecipe, ITag } from "../interfaces";

export const EmptyRecipe: IRecipe = {
    id: "",
    name: "",
    description: "",
    ingredients: [],
    tag_ids: [],
    steps: [],
    category_id: "",
    createdAt: "",
    updatedAt: "",
    authorId: ""
}

export const EmptyCategory: ICategory = {
    id: "",
    name: "",
    description: ""
}

export const EmptyTag: ITag = {
    id: "",
    name: "" 
}