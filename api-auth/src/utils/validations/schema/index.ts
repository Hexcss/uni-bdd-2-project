import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .min(6)
    .pattern(new RegExp('(?=.*[A-Z])(?=.*[0-9])')),
  firstName: Joi.string().required().not().empty(),
  lastName: Joi.string().required().not().empty(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
