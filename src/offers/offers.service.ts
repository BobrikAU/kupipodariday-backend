import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request as RequestExpress } from 'express';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { WischesService } from '../wisches/wisches.service';
import { UserHelper } from '../users/helpers/user.helper';
import { UsersService } from '../users/users.service';
import { OfferError } from '../errors/errors';
import { HTTP_CODE_CONFLICT } from '../constants';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    public readonly wischesService: WischesService,
    private readonly userHelper: UserHelper,
    private readonly usersService: UsersService,
  ) {}

  async create(offer: unknown) {
    return await this.offerRepository.save(offer);
  }

  async findAll() {
    return await this.offerRepository.find({
      select: {
        user: {
          id: true,
          username: true,
          about: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      relations: {
        item: true,
        user: true,
      },
    });
  }

  async findOne(query: { [name: string]: number | string }) {
    return await this.offerRepository.findOneOrFail({
      select: {
        user: {
          id: true,
          username: true,
          about: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      relations: {
        item: true,
        user: true,
      },
      where: query,
    });
  }

  async update(id: number, updateOfferDto: UpdateOfferDto) {
    return await this.offerRepository.update(id, updateOfferDto);
  }

  async remove(id: number) {
    return await this.offerRepository.delete(id);
  }

  async createOffer(createOfferDto: CreateOfferDto, request: RequestExpress) {
    const item = await this.wischesService.findOne({
      id: createOfferDto.itemId,
    });
    const userId = this.userHelper.getUserIdOutRequest(request);
    if (userId === item.owner.id) {
      throw new OfferError(
        'Вы подаете заявку на оплату собственного подарка. Это могут делать только другие пользователи.',
        HTTP_CODE_CONFLICT,
      );
    }
    if (item.price === item.raised) {
      throw new OfferError(
        'Средства на данный подарок уже собраны. К сожалению, Вы не можете подать новую заявку.',
        HTTP_CODE_CONFLICT,
      );
    }
    const amountCollected = Number(item.raised) + createOfferDto.amount;
    if (item.price < amountCollected) {
      throw new OfferError(
        `Общая сумма сбора с Вашим взносом превышает цену подарка. Выберите сумму, не превышающую ${
          Math.floor((item.price - item.raised) * 100) / 100
        } рублей`,
        HTTP_CODE_CONFLICT,
      );
    }
    const user = await this.usersService.findOne({ id: userId });
    const offer = {
      amount: createOfferDto.amount,
      hidden: createOfferDto.hidden,
      item,
      user,
    };
    await this.create(offer);
    await this.wischesService.update(item.id, { raised: amountCollected });
    return {};
  }
}
