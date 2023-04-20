import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserHash } from './helpers/hash.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userHasch: UserHash,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.userHasch.hashPassword(
      createUserDto.password,
    );
    return await this.userRepository.save(createUserDto);
  }

  /*  findAll() {
    return `This action returns all users`;
  }  */

  async findMe(userId: number) {
    return await this.userRepository.findOneOrFail({
      where: { id: userId },
    });
  }

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

  async updateMe(userId: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await this.userHasch.hashPassword(
        updateUserDto.password,
      );
    }
    await this.userRepository.update({ id: userId }, updateUserDto);
    return await this.userRepository.findOneOrFail({
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
        id: userId,
      },
    });
  }

  remove(username: string) {
    return this.userRepository.delete({ username });
  }

  async findMyWishes(userId: number) {
    return await this.userRepository.findOneOrFail({
      select: {
        wishes: true, // выбрано не все, что нужно по свагеру, но в коде не увидел, куда нужна вся эта информация
      },
      relations: {
        wishes: true,
      },
      where: {
        id: userId,
      },
    });
  }

  async findAnotherUserWishes(username: string) {
    return await this.userRepository.findOneOrFail({
      select: {
        wishes: true, // выбрано не все, так как по коду нужна только информация о самом подарке
      },
      relations: {
        wishes: true,
      },
      where: { username },
    });
  }
}
