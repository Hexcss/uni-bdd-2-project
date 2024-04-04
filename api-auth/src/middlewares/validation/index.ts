import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { registerSchema, loginSchema } from '../../utils/validations/schema';
import { getValidationErrorMessages } from '../../utils/functions';

const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = getValidationErrorMessages(error);
      res.status(400).json({
        status: 'error',
        statusCode: 400,
        message: 'Validation error',
        errors,
      });
      return;
    }
    next();
  };
};

export const validateRegister = validate(registerSchema);
export const validateLogin = validate(loginSchema);
