import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wisch.entity';
import { CreateWischDto } from './dto/create-wisch.dto';
import { UpdateWischDto } from './dto/update-wisch.dto';
import { UsersService } from 'src/users/users.service';
import { ForbiddenActionError } from '../errors/errors';

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
    const wish = await this.findOne({ id: wishId });
    if (userId !== wish.owner.id) {
      throw new ForbiddenActionError(
        'Запрещено редактировать чужие пожелания.',
      );
    }
    if (
      updateWischDto.price &&
      updateWischDto.price !== wish.price &&
      wish.offers.length !== 0
    ) {
      throw new ForbiddenActionError(
        'Невозможно изменить цену подарка, если другие согласились участвовать в его покупке.',
      );
    }
    await this.wishRepository.update(wishId, updateWischDto);
    return {};
  }

  async remove(id: number) {
    return await this.wishRepository.delete(id);
  }
}
