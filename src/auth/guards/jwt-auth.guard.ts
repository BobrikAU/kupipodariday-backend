import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { authorization: authorizationHeader } = request.headers;
    const token = authorizationHeader.split('Bearer ')[1];
    const user = this.jwtService.decode(token);
    if (user) {
      request.user = user;
      return true;
    }
    return false;
  }
}
