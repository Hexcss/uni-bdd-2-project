import { Request, Response } from 'express';
import { IRegister, IUser } from '../../utils/interfaces';
import { hash } from 'bcrypt-ts';
import { MongoService } from '../../services/data';
import UserModel from '../../models/user';
import { environment } from '../../config';

export class UserController {
  private userService: MongoService<IUser>;

  constructor() {
    this.userService = new MongoService<IUser>(UserModel);
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, firstName, lastName }: IRegister = req.body;

      const existingUser = await this.userService.findOne({ email });
      if (existingUser) {
        res.status(409).send('User already exists');
        return;
      }

      const hashedPassword = await hash(password, environment.SALT_ROUNDS);

      const newUser = await this.userService.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      const userWithoutPassword = { ...newUser.toObject() };
      delete userWithoutPassword.password;

      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error registering new user');
    }
  };
}
