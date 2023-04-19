import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  /*  findAll() {
    return `This action returns all users`;
  }  */

  async findOne(username: string) {
    return await this.userRepository.findOneOrFail({
      where: {
        username,
      },
    });
  }

  async findMany(query: string) {
    return await this.userRepository.find({
      select: {
        id: true,
        username: true,
        email: true,
        about: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
      where: [{ username: query }, { email: query }],
    });
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ username }, updateUserDto);
    return await this.userRepository.findOne({
      select: {
        id: true,
        username: true,
        email: true,
        about: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        username,
      },
    });
  }

  remove(username: string) {
    return this.userRepository.delete({ username });
  }
}
