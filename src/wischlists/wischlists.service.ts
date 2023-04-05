import { Injectable } from '@nestjs/common';
import { CreateWischlistDto } from './dto/create-wischlist.dto';
import { UpdateWischlistDto } from './dto/update-wischlist.dto';

@Injectable()
export class WischlistsService {
  create(createWischlistDto: CreateWischlistDto) {
    return 'This action adds a new wischlist';
  }

  findAll() {
    return `This action returns all wischlists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wischlist`;
  }

  update(id: number, updateWischlistDto: UpdateWischlistDto) {
    return `This action updates a #${id} wischlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wischlist`;
  }
}
