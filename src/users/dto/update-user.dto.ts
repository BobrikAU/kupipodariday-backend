import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  USERNAME_LENGTH_MIN,
  USERNAME_LENGTH_MAX,
  ABOUT_LENGTH_MIN,
  ABOUT_LENGTH_MAX,
  PASSWORD_LENGTH_MIN,
} from '../../constants';

import { Length, IsUrl, IsEmail, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Length(USERNAME_LENGTH_MIN, USERNAME_LENGTH_MAX)
  username: string;

  @IsOptional()
  @Length(ABOUT_LENGTH_MIN, ABOUT_LENGTH_MAX)
  about: string;

  @IsOptional()
  @IsUrl()
  avatar: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(PASSWORD_LENGTH_MIN)
  password: string;
}

// export class UpdateUserDto extends PartialType(CreateUserDto) {}
