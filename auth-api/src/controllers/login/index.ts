import { Request, Response } from 'express';
import { compare } from 'bcrypt';
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

  private async verifyUser(
    email: string,
    password: string
  ): Promise<IUser | null> {
    const user = await this.userService.findOne({ email });
    if (!user || !(await compare(password, user.password))) {
      return null;
    }
    return user;
  }

  private generateToken(user: IUser): Promise<string> {
    const tokenPayload = {
      userId: user._id,
      email: user.email,
    };
    const tokenExpiration = environment.JWT_EXPIRATION;

    return new Promise((resolve, reject) => {
      sign(
        tokenPayload,
        environment.JWT_KEY,
        { expiresIn: tokenExpiration },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await this.verifyUser(email, password);

      if (!user) {
        loggingMiddleware.logger.warn(`Login failed for user: ${email}`);
        res.status(401).json({ message: 'Authentication failed' });
        return;
      }

      const token = await this.generateToken(user);
      loggingMiddleware.logger.info(`User logged in: ${email}`);
      res.json({ token, expiresIn: environment.JWT_EXPIRATION });
    } catch (error) {
      loggingMiddleware.logger.error(`Login error: ${error.message}`);
      res.status(500).send('An error occurred during the login process');
    }
  };
}

export default LoginController;
