import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wisch.entity';
import { CreateWischDto } from './dto/create-wisch.dto';
import { UpdateWischDto } from './dto/update-wisch.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WischesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    private usersService: UsersService,
  ) {}

  async create(createWischDto: CreateWischDto, ownerId: number) {
    const owner = await this.usersService.findMe(ownerId);
    const data = { ...createWischDto, owner };
    await this.wishRepository.save(data);
    return {};
  }

  async findAllLast() {
    return await this.wishRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
  }

  async findAllTop() {
    return await this.wishRepository.find({
      order: {
        copied: 'DESC',
      },
      take: 20,
    });
  }

  async findOne(query: { id: number }) {
    return await this.wishRepository.findOneOrFail({
      select: {
        owner: {
          username: true,
        },
        offers: {
          createdAt: true,
          amount: true,
          user: {
            username: true,
          },
        },
      },
      relations: {
        owner: true,
        offers: {
          user: true,
        },
      },
      where: query,
    });
  }

  async update(id: number, updateWischDto: UpdateWischDto) {
    return await this.wishRepository.update(id, updateWischDto);
  }

  async remove(id: number) {
    return await this.wishRepository.delete(id);
  }
}
