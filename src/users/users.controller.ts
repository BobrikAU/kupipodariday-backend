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
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneUser } from './dto/find-one-user.dto';
import { FindManyDto } from './dto/find-many.dto';
import { Request as RequestExpress } from 'express';
import { UserHelper } from './helpers/user.helper';
import { InvalidUserData } from '../filters/user-exists.filter';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userHelper: UserHelper,
  ) {}

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
    const userId = this.userHelper.getUserIdOutRequest(request);
    const { password, ...userWithoutPassword } = await this.usersService.findMe(
      userId,
    );
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

  @UseFilters(InvalidUserData)
  @Patch('me')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Request() request: RequestExpress,
  ) {
    const userId = this.userHelper.getUserIdOutRequest(request);
    return this.usersService.updateMe(userId, updateUserDto);
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.usersService.remove(username);
  }
}
