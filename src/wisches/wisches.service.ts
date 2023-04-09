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

  create(createWischDto: CreateWischDto) {
    const data = { ...createWischDto };
    return this.wishRepository.insert(data);
  }

  findAll() {
    return this.wishRepository.find();
  }

  findOne(id: number) {
    return this.wishRepository.findOneByOrFail({ id });
  }

  update(id: number, updateWischDto: UpdateWischDto) {
    return this.wishRepository.update(id, updateWischDto);
  }

  remove(id: number) {
    return this.wishRepository.delete(id);
  }
}
