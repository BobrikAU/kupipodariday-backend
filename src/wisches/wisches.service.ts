import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, DataSource } from 'typeorm';
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
    private dataSource: DataSource,
  ) {}

  async create(createWischDto: CreateWischDto, ownerId: number) {
    const owner = await this.usersService.findMe(ownerId);
    const data = { ...createWischDto, owner };
    await this.wishRepository.save(data);
    return {};
  }

  async findAllLast() {
    return await this.wishRepository.find({
      where: { copied_from: IsNull() },
      order: { createdAt: 'DESC' },
      take: LENGTH_LIST_LAST_GIFTS,
    });
  }

  async findAllTop() {
    return await this.wishRepository.find({
      where: { copied_from: IsNull() },
      order: { copied: 'DESC' },
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
    // проверяем, есть ли подарок с указанным id и создан ли он пользователем, который инициировал
    // его удаление
    const deletedWish = await this.wishRepository.findOneByOrFail({
      id: wishId,
      owner: { id: userId },
    });
    // проверяем, дедались ли с данного подарка копии; если да, то самая ранняя его копия займет
    // место оригинала и получит данные о количестве созданных копий, что позволит в выдаче сохранить
    // реальную статистику популярности; если нет, просто удаляем
    if (deletedWish.copied > 0) {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        // находим все копии удаляемого подарка, сортируя по дате копирования
        const copiedWishes = await queryRunner.manager.find(Wish, {
          where: {
            copied_from: wishId,
          },
          order: {
            createdAt: 'ASC',
          },
        });
        if (copiedWishes.length > 0) {
          const firstCopiedWishes = copiedWishes.shift();
          await Promise.all([
            // самая ранняя копия станет оригиналом
            queryRunner.manager.update(Wish, firstCopiedWishes.id, {
              copied_from: null,
              copied: deletedWish.copied,
            }),
            copiedWishes.map((wish) => {
              queryRunner.manager.update(Wish, wish.id, {
                copied_from: firstCopiedWishes.id,
              });
            }),
          ]);
        }
        await queryRunner.commitTransaction();
      } catch {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    }
    // удаление подарка
    await this.wishRepository.delete(wishId);
    return deletedWish;
  }

  async copy(wishId: { id: number }, userId: number) {
    // находим id ползователя, который копирует карточку подарка
    const owner = await this.usersService.findMe(userId);
    // находим подарок, на карточке которого пользователь начал процесс копирования
    const copiedWish = await this.wishRepository.findOneByOrFail(wishId);
    // создаем переменную, где будет id подарка, который является оригинальным
    let originalWishId: number;
    if (!copiedWish.copied_from) {
      // если подарок, на карточке которого начато копирование, сам не является копией, то
      // он принимается за оригинальный и у него увеличивается число копий
      originalWishId = copiedWish.id;
      await this.wishRepository.update(copiedWish.id, {
        copied: copiedWish.copied + 1,
      });
    } else {
      // есди подарок, на карточке которого начато копирование, является копией, то находим
      // оригинал и увеличиваем у него число копий
      originalWishId = copiedWish.copied_from;
      const originalWish = await this.wishRepository.findOneByOrFail({
        id: originalWishId,
      });
      await this.wishRepository.update(originalWish.id, {
        copied: originalWish.copied + 1,
      });
    }
    // создаем копию подарка
    const copiedWishData = {
      name: copiedWish.name,
      link: copiedWish.link,
      image: copiedWish.image,
      price: copiedWish.price,
      description: copiedWish.description,
      copied_from: originalWishId,
      owner,
    };
    await this.wishRepository.save(copiedWishData);
    return {};
  }
}
