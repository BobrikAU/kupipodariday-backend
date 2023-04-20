import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UserHelper } from './helpers/user.helper';
import { UserHash } from './helpers/hash.helper';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserHelper, UserHash],
  exports: [UsersService, UserHash],
})
export class UsersModule {}
