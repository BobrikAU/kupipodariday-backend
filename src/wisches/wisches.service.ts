import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wisch.entity';
import { CreateWischDto } from './dto/create-wisch.dto';
import { UpdateWischDto } from './dto/update-wisch.dto';

@Injectable()
export class WischesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async create(createWischDto: CreateWischDto) {
    const data = { ...createWischDto };
    return await this.wishRepository.insert(data);
  }

  async findAll() {
    return await this.wishRepository.find();
  }

  async findOne(id: number) {
    return await this.wishRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateWischDto: UpdateWischDto) {
    return await this.wishRepository.update(id, updateWischDto);
  }

  async remove(id: number) {
    return await this.wishRepository.delete(id);
  }
}
