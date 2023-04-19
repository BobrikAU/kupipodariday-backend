import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneUser } from './dto/find-one-user.dto';
import { FindManyDto } from './dto/find-many.dto';
import { Request as RequestExpress } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /*  @Get()
  findAll() {
    return this.usersService.findAll();
  }  */

  @Get('me')
  async findMe(@Request() request: RequestExpress) {
    let username: string;
    for (const key in request.user) {
      if (key === 'userName') {
        username = request.user[key];
      }
    }
    const { password, ...userWithoutPassword } =
      await this.usersService.findOne(username);
    return userWithoutPassword;
  }

  @Get(':username')
  findOne(@Param('username') username: FindOneUser) {
    return this.usersService.findOne(username.usermane);
  }

  @Post('find')
  findMany(@Body() findManyDto: FindManyDto) {
    return this.usersService.findMany(findManyDto.query);
  }

  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(username, updateUserDto);
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.usersService.remove(username);
  }
}
