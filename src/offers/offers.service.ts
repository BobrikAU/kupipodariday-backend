import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { WischesService } from '../wisches/wisches.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    public readonly wischesService: WischesService,
  ) {}

  async create(createOfferDto: CreateOfferDto) {
    const item = await this.wischesService.findOne(createOfferDto.item);
    const offer = {
      ...createOfferDto,
      item,
    };
    return await this.offerRepository.save(offer);
  }

  async findAll() {
    return await this.offerRepository.find({
      relations: {
        item: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.offerRepository.findOneOrFail({
      relations: {
        item: true,
      },
      where: { id },
    });
  }

  async update(id: number, updateOfferDto: UpdateOfferDto) {
    return await this.offerRepository.update(id, updateOfferDto);
  }

  async remove(id: number) {
    return await this.offerRepository.delete(id);
  }
}
