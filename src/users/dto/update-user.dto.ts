import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

import { Length, IsUrl, IsEmail, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Length(2, 30)
  username: string;

  @IsOptional()
  @Length(2, 200)
  about: string;

  @IsOptional()
  @IsUrl()
  avatar: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(2)
  password: string;
}

// export class UpdateUserDto extends PartialType(CreateUserDto) {}
