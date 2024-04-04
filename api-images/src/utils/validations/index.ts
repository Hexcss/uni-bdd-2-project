import Joi from 'joi';

const categoryImageSchema = Joi.object({
  category_id: Joi.string().required(),
  image: Joi.any().required(),
});

const recipeImageSchema = Joi.object({
  recipe_id: Joi.string().required(),
  image: Joi.any().required(),
});

export { categoryImageSchema, recipeImageSchema };
