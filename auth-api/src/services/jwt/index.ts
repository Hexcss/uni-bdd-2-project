import { sign } from 'jsonwebtoken';
import { environment } from '../../config';
import { IUser } from '../../utils/interfaces';

export class JwtService {
  static generateToken(user: IUser): Promise<string> {
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
            resolve(token!);
          }
        }
      );
    });
  }
}
