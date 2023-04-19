import { Injectable } from '@nestjs/common';
import { AuthHash } from './helpers/hash.helper';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthUserDto } from './dto/authUser.dto';
import { JwtService } from '@nestjs/jwt';
import { ServerError } from '../errors/errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly authHasch: AuthHash,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const userData = {
      ...createUserDto,
      password: await this.authHasch.hashPassword(createUserDto.password),
    };
    return await this.usersService.create(userData);
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (user) {
      const { password: hashPassword, ...restUser } = user;
      const isPasportValid = await this.authHasch.validatePassword(
        password,
        hashPassword,
      );
      if (isPasportValid) {
        return restUser;
      }
    }
    return null;
  }

  async signin(userName: string, userId: number) {
    const payload = { userName, userId };
    let token: string;
    try {
      token = this.jwtService.sign(payload);
    } catch {
      throw new ServerError('Ошибка сервера при авторизации. Попробуйте снова');
    }
    return {
      access_token: token,
    };
  }
}
