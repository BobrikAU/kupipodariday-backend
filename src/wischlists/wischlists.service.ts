import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wischlist.entity';
import { CreateWischlistDto } from './dto/create-wischlist.dto';
import { UpdateWischlistDto } from './dto/update-wischlist.dto';

@Injectable()
export class WischlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishListRepository: Repository<Wishlist>,
  ) {}

  async create(createWischlistDto: CreateWischlistDto) {
    return await this.wishListRepository.save(createWischlistDto);
  }

  async findAll() {
    return await this.wishListRepository.find();
  }

  async findOne(id: number) {
    return await this.wishListRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateWischlistDto: UpdateWischlistDto) {
    return await this.wishListRepository.update(id, updateWischlistDto);
  }

  async remove(id: number) {
    return await this.wishListRepository.delete({ id });
  }
}
