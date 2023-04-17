import {
  Length,
  IsNotEmpty,
  IsUrl,
  IsEmail,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Поле Юзерннейм обязательно' })
  @Length(3, 64, {
    message: 'Имя пользователя должно быть не менее 3 и не более 64 символов',
  })
  username: string;

  @IsOptional()
  @Length(2, 200, {
    message:
      'Информация о пользователе должна быть не менее 2 и не более 200 символов или поле должно быть пустым',
  })
  about: string;

  @IsOptional()
  @IsUrl({
    message:
      'В поле Аватар следует указать URL изображения или оставить пустым',
  })
  avatar: string;

  @IsNotEmpty({ message: 'Поле E-mail обязательно' })
  @IsEmail({
    message: 'В поле E-mail был указан невалидный адрес электронной почты',
  })
  email: string;

  @IsNotEmpty({ message: 'Поле Пароль обязательно' })
  @MinLength(3, {
    message: 'Пароль должен быть не менее 3 символов',
  })
  password: string;
}
