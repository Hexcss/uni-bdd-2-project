import Joi from 'joi';

const categorySchema = Joi.object({
  id: Joi.string().alphanum().trim().min(8).required(),
  name: Joi.string().min(3).required(),
  description: Joi.string().allow('', null),
});

export default categorySchema;
