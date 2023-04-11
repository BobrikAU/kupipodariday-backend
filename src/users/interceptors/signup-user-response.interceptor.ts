import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class SignupUserResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(
        ({
          id,
          username,
          about,
          avatar,
          email,
          createdAt,
          updatedAt,
        }: UserResponseDto) => ({
          id,
          username,
          about,
          avatar,
          email,
          createdAt,
          updatedAt,
        }),
      ),
    );
  }
}
