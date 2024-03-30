import { Request, Response } from 'express';
import { compare } from 'bcrypt-ts';
import { sign } from 'jsonwebtoken';
import { MongoService } from '../../services/data';
import { IUser } from '../../utils/interfaces';
import UserModel from '../../models/user';
import { environment } from '../../config';

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
        res.status(401).json({ message: 'Authentication failed' });
      }

      const token = sign(
        { userId: user._id, email: user.email },
        environment.JWT_KEY,
        { expiresIn: '2h' }
      );

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred during the login process');
    }
  };
}

export default LoginController;
