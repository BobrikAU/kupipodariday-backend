import { Module } from '@nestjs/common';
import { WischesService } from './wisches.service';
import { WischesController } from './wisches.controller';

@Module({
  controllers: [WischesController],
  providers: [WischesService]
})
export class WischesModule {}
