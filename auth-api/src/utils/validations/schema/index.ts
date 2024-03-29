import Joi from 'joi';
import { ILogin, IRegister } from '../../interfaces';

export const registerSchema = (data: IRegister) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      .min(6)
      .pattern(new RegExp('(?=.*[A-Z])(?=.*[0-9])')),
    firstName: Joi.string().required().not().empty(),
    lastName: Joi.string().required().not().empty(),
  });
  return schema.validate(data);
};

export const loginSchema = (data: ILogin) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};
