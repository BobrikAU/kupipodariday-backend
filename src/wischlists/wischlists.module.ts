import { Module } from '@nestjs/common';
import { WischlistsService } from './wischlists.service';
import { WischlistsController } from './wischlists.controller';

@Module({
  controllers: [WischlistsController],
  providers: [WischlistsService]
})
export class WischlistsModule {}
