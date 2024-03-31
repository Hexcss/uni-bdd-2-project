import { Request, Response } from 'express';
import { compare } from 'bcrypt-ts';
import { sign } from 'jsonwebtoken';
import MongoService from '../../services/data';
import UserModel from '../../models/user';
import { environment } from '../../config';
import { loggingMiddleware } from '../../middlewares';
import { IUser } from '../../utils/interfaces';

class LoginController {
  private userService: MongoService<IUser>;

  constructor() {
    this.userService = new MongoService<IUser>(UserModel);
  }

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.findOne({ email });

      if (!user || !(await compare(password, user.password))) {
        loggingMiddleware.logger.warn(`Login failed for user: ${email}`);
        res.status(401).json({ message: 'Authentication failed' });
      }

      const token = sign(
        { userId: user._id, email: user.email },
        environment.JWT_KEY,
        { expiresIn: '2h' }
      );

      loggingMiddleware.logger.info(`User logged in: ${email}`);

      res.json({ token });
    } catch (error) {
      loggingMiddleware.logger.error(`Login error: ${error.message}`);
      res.status(500).send('An error occurred during the login process');
    }
  };
}

export default LoginController;
