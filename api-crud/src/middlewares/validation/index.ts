import categorySchema from '../../utils/schemas/category';
import recipeSchema from '../../utils/schemas/recipe';
import tagSchema from '../../utils/schemas/tag';
import { Request, Response, NextFunction } from 'express';

const validateCategory = (req: Request, res: Response, next: NextFunction) => {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    next();
  }
};

const validateRecipe = (req: Request, res: Response, next: NextFunction) => {
  const { error } = recipeSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    next();
  }
};

const validateTag = (req: Request, res: Response, next: NextFunction) => {
  const { error } = tagSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    next();
  }
};

export default { validateCategory, validateRecipe, validateTag };
