import { Request, Response, NextFunction } from 'express';
import { MongoService } from '../../services/data';
import UserModel from '../../models/user';
import { IUser } from '../../utils/interfaces';

class ProfileController {
  private userService: MongoService<IUser>;

  constructor() {
    this.userService = new MongoService<IUser>(UserModel);
  }

  public getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.params.id;
      const user = await this.userService.findOne({ _id: userId });
      if (!user) {
        return next({ status: 404, message: 'User not found' });
      }

      const userWithoutPassword = { ...user.toJSON() };
      delete userWithoutPassword.password;

      res.status(200).json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  };

  public updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id: userId } = req.params;
    const { password, ...updateData } = req.body;

    if (password) {
      return next({
        status: 400,
        message:
          'Direct password updates are not allowed. Please use the dedicated endpoint.',
      });
    }

    try {
      const updatedUser = await this.userService.update(
        { _id: userId },
        updateData
      );
      if (!updatedUser) {
        return next({ status: 404, message: 'User not found' });
      }

      const updatedUserObject = updatedUser.toJSON();
      delete updatedUserObject.password;

      res.status(200).json(updatedUserObject);
    } catch (error) {
      next(error);
    }
  };

  public deleteProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.params.id;
      const result = await this.userService.delete({ _id: userId });
      if (result?.deletedCount === 0) {
        return next({ status: 404, message: 'User not found' });
      }
      res.status(200).send('User profile deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}

export default ProfileController;
