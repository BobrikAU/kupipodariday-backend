import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ServerError } from '../../errors/errors';
import { BCRYPT_GENSALT_ROUNDS } from '../../constants';

@Injectable()
export class UserHash {
  public async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(BCRYPT_GENSALT_ROUNDS);
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
