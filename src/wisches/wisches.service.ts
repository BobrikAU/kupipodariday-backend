import { Injectable } from '@nestjs/common';
import { CreateWischDto } from './dto/create-wisch.dto';
import { UpdateWischDto } from './dto/update-wisch.dto';

@Injectable()
export class WischesService {
  create(createWischDto: CreateWischDto) {
    return 'This action adds a new wisch';
  }

  findAll() {
    return `This action returns all wisches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wisch`;
  }

  update(id: number, updateWischDto: UpdateWischDto) {
    return `This action updates a #${id} wisch`;
  }

  remove(id: number) {
    return `This action removes a #${id} wisch`;
  }
}
