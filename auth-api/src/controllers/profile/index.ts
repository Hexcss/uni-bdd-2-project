import { Request, Response, NextFunction } from 'express';
import { MongoService } from '../../services/data';
import UserModel from '../../models/user';
import { IUser } from '../../utils/interfaces';
import loggingMiddleware from '../../middlewares/logger/index';

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
    const userId = req.params.id;
    try {
      const user = await this.userService.findOne({ _id: userId });
      if (!user) {
        loggingMiddleware.logger.warn(
          `Profile fetch failed: User not found with ID ${userId}`
        );
        return next({ status: 404, message: 'User not found' });
      }

      const userWithoutPassword = { ...user.toJSON() };
      delete userWithoutPassword.password;

      loggingMiddleware.logger.info(`Profile fetched for user ID ${userId}`);
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      loggingMiddleware.logger.error(
        `Error fetching profile for user ID ${userId}: ${error}`
      );
      next(error);
    }
  };

  public updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.params.id;
    const { password, ...updateData } = req.body;

    if (password) {
      loggingMiddleware.logger.warn(
        `Attempted direct password update for user ID ${userId}`
      );
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
        loggingMiddleware.logger.warn(
          `Profile update failed: User not found with ID ${userId}`
        );
        return next({ status: 404, message: 'User not found' });
      }

      const updatedUserObject = updatedUser.toJSON();
      delete updatedUserObject.password;

      loggingMiddleware.logger.info(`Profile updated for user ID ${userId}`);
      res.status(200).json(updatedUserObject);
    } catch (error) {
      loggingMiddleware.logger.error(
        `Error updating profile for user ID ${userId}: ${error}`
      );
      next(error);
    }
  };

  public deleteProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.params.id;
    try {
      const result = await this.userService.delete({ _id: userId });
      if (result?.deletedCount === 0) {
        loggingMiddleware.logger.warn(
          `Profile deletion failed: User not found with ID ${userId}`
        );
        return next({ status: 404, message: 'User not found' });
      }
      loggingMiddleware.logger.info(`Profile deleted for user ID ${userId}`);
      res.status(200).send('User profile deleted successfully');
    } catch (error) {
      loggingMiddleware.logger.error(
        `Error deleting profile for user ID ${userId}: ${error}`
      );
      next(error);
    }
  };
}

export default ProfileController;
