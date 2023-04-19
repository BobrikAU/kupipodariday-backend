import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ServerError } from '../../errors/errors';

@Injectable()
export class AuthHash {
  public async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  public async validatePassword(password: string, hashPassword: string) {
    try {
      const isPasswordValid = await bcrypt.compare(password, hashPassword);
      return isPasswordValid;
    } catch {
      throw new ServerError(
        'Ошибка сервера при проверке пароля. Попробуйте снова.',
      );
    }
  }
}
