import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';

@Catch(QueryFailedError)
export class UserOrMailExistsExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let message = exception.message;
    let status: number;
    if (message.includes('повторяющееся значение ключа')) {
      message = 'Пользователь с таким email или username уже зарегистрирован';
      status = 409;
    } else {
      status = 500;
      message = 'Ошибка сервера. Уже работаем над ее устранением';
    }
    response.status(status).json({ message });
  }
}

@Catch(BadRequestException)
export class InvalidUserData implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errResponse = exception.getResponse();
    let message: string;
    if (typeof errResponse === 'object') {
      for (const key in errResponse) {
        if (key === 'message') {
          message = errResponse[key].join('. ');
        }
      }
    } else {
      message = errResponse;
    }
    response.status(status).json({ message });
  }
}

@Catch(UnauthorizedException, EntityNotFoundError)
export class UserOrPasswordNotValid implements ExceptionFilter {
  catch(
    exception: UnauthorizedException | EntityNotFoundError,
    host: ArgumentsHost,
  ) {
    let status: number;
    if (exception instanceof UnauthorizedException) {
      status = exception.getStatus();
    }
    if (exception instanceof EntityNotFoundError) {
      status = 401;
    }
    const response = host.switchToHttp().getResponse<Response>();
    const message = 'Некорректная пара логин и пароль';
    response.status(status).json({ message });
  }
}
