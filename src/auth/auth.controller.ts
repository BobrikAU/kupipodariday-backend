import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Header,
  UseFilters,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignupAuthResponseInterceptor } from './interceptors/signup-auth-response.interceptor';
import {
  UserOrMailExistsExceptionFilter,
  InvalidUserData,
} from '../filters/user-exists.filter';

@Controller()
@UseFilters(UserOrMailExistsExceptionFilter, InvalidUserData)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(SignupAuthResponseInterceptor)
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
}
