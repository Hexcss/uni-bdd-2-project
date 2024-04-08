import { Request, Response } from 'express';
import MongoService from '../../services/data';
import UserModel from '../../models/user';
import { IUser } from '../../utils/interfaces';
import { environment } from '../../config';
import { EncryptionService, JwtService } from '../../services';
import { loggingMiddleware } from '../../middlewares';

class LoginController {
  private userService: MongoService<IUser>;

  constructor() {
    this.userService = new MongoService<IUser>(UserModel);
  }

  private async authenticateUser(
    email: string,
    password: string
  ): Promise<IUser | null> {
    const user = await this.userService.findOne({ email });
    if (
      !user ||
      !(await EncryptionService.verifyPassword(password, user.password))
    ) {
      return null;
    }
    return user;
  }

  private async generateLoginResponse(
    user: IUser
  ): Promise<{ token: string; expiresIn: string | undefined }> {
    const token = await JwtService.generateToken(user, false);
    return { token, expiresIn: environment.JWT_EXPIRATION };
  }

  private async generateTokenResponse(user: IUser): Promise<{ token: string }> {
    const token = await JwtService.generateToken(user, true);
    return { token };
  }

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.authenticateUser(email, password);

      if (!user) {
        loggingMiddleware.logger.warn(`Login failed for user: ${email}`);
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const loginResponse = await this.generateLoginResponse(user);
      loggingMiddleware.logger.info(`User logged in: ${email}`);
      res.json(loginResponse);
    } catch (error) {
      loggingMiddleware.logger.error(`Login error: ${error.message}`);
      res.status(500).send('An error occurred during the login process');
    }
  };

  public generateSpecialToken = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.authenticateUser(email, password);

      if (!user) {
        loggingMiddleware.logger.warn(`Token failed for user: ${email}`);
        return res
          .status(401)
          .json({ message: 'Token generation failed, user not valid' });
      }

      const loginResponse = await this.generateTokenResponse(user);
      loggingMiddleware.logger.info(`Token created for: ${email}`);
      res.json(loginResponse);
    } catch (error) {
      loggingMiddleware.logger.error(`Token error: ${error.message}`);
      res
        .status(500)
        .send('An error occurred during the token generation process');
    }
  };
}

export default LoginController;
