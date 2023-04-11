import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WischesService } from './wisches.service';
import { WischesController } from './wisches.controller';
import { Wish } from './entities/wisch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wish])],
  controllers: [WischesController],
  providers: [WischesService],
  exports: [WischesService],
})
export class WischesModule {}
