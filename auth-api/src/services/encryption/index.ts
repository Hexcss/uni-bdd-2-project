import { compare, hash } from 'bcrypt';
import { environment } from '../../config';

class EncryptionService {
  static async hashPassword(
    password: string,
    saltRounds = environment.SALT_ROUNDS
  ): Promise<string> {
    return hash(password, saltRounds);
  }

  static async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}

export default EncryptionService;
