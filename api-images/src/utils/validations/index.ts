import Joi from 'joi';

const categoryImageSchema = Joi.object({
  category_id: Joi.string().required(),
});

const recipeImageSchema = Joi.object({
  recipe_id: Joi.string().required(),
});

export { categoryImageSchema, recipeImageSchema };
