import { Module } from '@nestjs/common';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthHash } from './helpers/hash.helper';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRESIN, JWT_SECRET } from '../constants';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ForbiddenExceptionFilter } from '../filters/user-exists.filter';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRESIN },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthHash,
    LocalStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_FILTER, useClass: ForbiddenExceptionFilter },
  ],
})
export class AuthModule {}
