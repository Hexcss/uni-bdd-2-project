import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { environment } from '../../config';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'No token provided, authorization denied' });
  }

  if (!verifyToken(token)) {
    return res.status(401).json({ message: 'Token is not valid' });
  }

  next();
};

const verifyToken = (token: string): boolean => {
  try {
    jwt.verify(token, environment.JWT_KEY);
    return true;
  } catch (error) {
    return false;
  }
};

export default authMiddleware;
