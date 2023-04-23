import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request as RequestExpress } from 'express';
import { Wishlist } from './entities/wischlist.entity';
import { CreateWischlistDto } from './dto/create-wischlist.dto';
import { UpdateWischlistDto } from './dto/update-wischlist.dto';
import { UserHelper } from '../users/helpers/user.helper';
import { UsersService } from '../users/users.service';
import { WischesService } from '../wisches/wisches.service';

@Injectable()
export class WischlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishListRepository: Repository<Wishlist>,
    private userHelper: UserHelper,
    private usersService: UsersService,
    private wischesService: WischesService,
  ) {}

  async create(data: { [name: string]: string | object }) {
    return await this.wishListRepository.save(data);
  }

  async findAll() {
    return await this.wishListRepository.find();
  }

  async findOne(query: { [name: string]: string | number }) {
    return await this.wishListRepository.findOneOrFail({
      relations: {
        items: true,
        owner: true,
      },
      where: query,
    });
  }

  async update(id: number, updateWischlistDto: UpdateWischlistDto) {
    return await this.wishListRepository.update(id, updateWischlistDto);
  }

  async remove(id: number) {
    return await this.wishListRepository.delete({ id });
  }

  async createWishlist(
    createWischlistDto: CreateWischlistDto,
    request: RequestExpress,
  ) {
    const ownerId = this.userHelper.getUserIdOutRequest(request);
    const owner = await this.usersService.findOne({ id: ownerId });
    const { itemsId, ...restCreateWischlistDto } = createWischlistDto;
    const itemsList = itemsId.map((itemId) => {
      return this.wischesService.findOne({ id: itemId });
    });
    return await Promise.all(itemsList)
      .then(async (items) => {
        const wishlistData = {
          ...restCreateWischlistDto,
          owner,
          items,
        };
        return this.create(wishlistData);
      })
      .then((wishlist) => {
        return wishlist;
      });
  }
}
