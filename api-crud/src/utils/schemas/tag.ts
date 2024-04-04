import Joi from 'joi';

const tagSchema = Joi.object({
  id: Joi.string().alphanum().trim().min(8).required(),
  name: Joi.string().min(3).required(),
});

export default tagSchema;
