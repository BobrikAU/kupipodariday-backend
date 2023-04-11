import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignupUserResponseInterceptor } from './interceptors/signup-user-response.interceptor';
import { FindOneUser } from './dto/find-one-user.dto';
import { FindManyDto } from './dto/find-many.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(SignupUserResponseInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /*  @Get()
  findAll() {
    return this.usersService.findAll();
  }  */

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
