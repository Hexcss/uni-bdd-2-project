import { compare, hash } from 'bcrypt';

class EncryptionService {
  static async hashPassword(
    password: string,
    saltRounds = 10
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
