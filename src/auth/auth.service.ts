import { Injectable } from '@nestjs/common';
import { AuthHash } from './auth.helper';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authHasch: AuthHash,
    private readonly usersService: UsersService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const userData = {
      ...createUserDto,
      password: await this.authHasch.hashPassword(createUserDto.password),
    };
    return await this.usersService.create(userData);
  }
}
