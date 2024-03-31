import { Request, Response } from 'express';
import { IRegister, IUser } from '../../utils/interfaces';
import MongoService from '../../services/data';
import UserModel from '../../models/user';
import { loggingMiddleware } from '../../middlewares';
import { EncryptionService } from '../../services';

class UserController {
  private userService: MongoService<IUser>;

  constructor() {
    this.userService = new MongoService<IUser>(UserModel);
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, firstName, lastName }: IRegister = req.body;

    try {
      const existingUser = await this.userService.findOne({ email });
      if (existingUser) {
        loggingMiddleware.logger.warn(
          `Registration attempt for existing email: ${email}`
        );
        res.status(409).send('User already exists');
        return;
      }

      const hashedPassword = await EncryptionService.hashPassword(password);
      const newUser = await this.userService.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      const userWithoutPassword = { ...newUser.toObject() };
      delete userWithoutPassword.password;

      loggingMiddleware.logger.info(`New user registered: ${email}`);

      res.status(201).json(userWithoutPassword);
    } catch (error) {
      loggingMiddleware.logger.error(
        `Registration error for email ${email}: ${error.message}`
      );
      res.status(500).send('Error registering new user');
    }
  };
}

export default UserController;
