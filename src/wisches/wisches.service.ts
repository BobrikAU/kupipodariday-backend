import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wisch.entity';
import { CreateWischDto } from './dto/create-wisch.dto';
import { UpdateWischDto } from './dto/update-wisch.dto';
import { UsersService } from 'src/users/users.service';
import { ForbiddenActionError } from '../errors/errors';
import {
  LENGTH_LIST_LAST_GIFTS,
  LENGTH_LIST_POPULAR_GIFTS,
} from '../constants';

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
      take: LENGTH_LIST_LAST_GIFTS,
    });
  }

  async findAllTop() {
    return await this.wishRepository.find({
      order: {
        copied: 'DESC',
      },
      take: LENGTH_LIST_POPULAR_GIFTS,
    });
  }

  async findOne(query: { id: number }) {
    return await this.wishRepository.findOneOrFail({
      select: {
        owner: {
          id: true,
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

  async update(wishId: number, updateWischDto: UpdateWischDto, userId: number) {
    if (updateWischDto.price) {
      const result = await this.wishRepository.update(
        {
          id: wishId,
          owner: { id: userId },
          price: updateWischDto.price,
        },
        updateWischDto,
      );
      if (result.affected === 0) {
        throw new ForbiddenActionError(
          'Вы хотите изменить цену подарка после согласия других участвовать в его оплате или изменить чужое пожелание. Это невозможно.',
        );
      }
    } else {
      const result = await this.wishRepository.update(
        {
          id: wishId,
          owner: { id: userId },
        },
        updateWischDto,
      );
      if (result.affected === 0) {
        throw new ForbiddenActionError(
          'Вы хотите изменить чужое пожелание. Это невозможно.',
        );
      }
    }
    return {};
  }

  async remove(wishId: number, userId: number) {
    const wish = await this.wishRepository.findOneByOrFail({
      id: wishId,
      owner: { id: userId },
    });
    await this.wishRepository.delete(wishId);
    return wish;
  }
}
