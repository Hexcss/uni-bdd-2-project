import {
  categoryImageSchema,
  recipeImageSchema,
} from '../../utils/validations';
import { Request, Response, NextFunction } from 'express';

const validateCategoryImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = categoryImageSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    next();
  }
};

const validateRecipeImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = recipeImageSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    next();
  }
};

export default { validateCategoryImage, validateRecipeImage };
