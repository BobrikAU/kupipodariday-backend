import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Header,
  UseFilters,
  UseGuards,
  Request,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthUserDto } from './dto/authUser.dto';
import { AuthService } from './auth.service';
import { SignupAuthResponseInterceptor } from './interceptors/signup-auth-response.interceptor';
import { SignupAuthRequestInterceptor } from './interceptors/signup-auth-request.interceptor';
import {
  UserOrMailExistsExceptionFilter,
  InvalidData,
  UserOrPasswordNotValid,
} from '../filters/user-exists.filter';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './guards/jwt-auth.guard';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @UseFilters(UserOrMailExistsExceptionFilter, InvalidData)
  @UseInterceptors(SignupAuthResponseInterceptor, SignupAuthRequestInterceptor)
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @UseFilters(UserOrPasswordNotValid)
  async signin(@Request() req) {
    const { username, id } = req.user;
    return this.authService.signin(username, id);
  }
}
