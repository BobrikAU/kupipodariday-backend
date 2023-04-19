import { IsNotEmpty, Length, MinLength } from 'class-validator';

export class AuthUserDto {
  @IsNotEmpty({ message: 'Поле Юзерннейм обязательно' })
  @Length(3, 64, {
    message: 'Имя пользователя должно быть не менее 3 и не более 64 символов',
  })
  username: string;

  @IsNotEmpty({ message: 'Поле Пароль обязательно' })
  @MinLength(3, {
    message: 'Пароль должен быть не менее 3 символов',
  })
  password: string;
}
