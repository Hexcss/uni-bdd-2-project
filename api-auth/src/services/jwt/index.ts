import { sign } from 'jsonwebtoken';
import { environment } from '../../config';
import { IUser } from '../../utils/interfaces';

class JwtService {
  static generateToken(user: IUser, isSpecial: boolean): Promise<string> {
    const tokenPayload = {
      userId: user._id,
      email: user.email,
    };

    return new Promise((resolve, reject) => {
      const signOptions = isSpecial
        ? {}
        : { expiresIn: environment.JWT_EXPIRATION };

      sign(tokenPayload, environment.JWT_KEY, signOptions, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token!);
        }
      });
    });
  }
}

export default JwtService;
