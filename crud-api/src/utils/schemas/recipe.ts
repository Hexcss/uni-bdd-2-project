import Joi from 'joi';

const recipeSchema = Joi.object({
  id: Joi.string().alphanum().trim().min(6).required(),
  name: Joi.string().min(3).required(),
  description: Joi.string().allow('', null),
  ingredients: Joi.array().items(Joi.string().min(3)),
  steps: Joi.array().items(Joi.string().min(3)),
  category_id: Joi.string().alphanum().trim().min(9).required(),
  tag_ids: Joi.array().items(Joi.string().alphanum().trim().min(4).required()),
  createdAt: Joi.date().default(Date.now).allow(null),
  updatedAt: Joi.date().default(Date.now).allow(null),
  authorId: Joi.string().alphanum().trim().required(),
});

export default recipeSchema;
