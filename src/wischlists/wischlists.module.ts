import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WischlistsService } from './wischlists.service';
import { WischlistsController } from './wischlists.controller';
import { Wishlist } from './entities/wischlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist])],
  controllers: [WischlistsController],
  providers: [WischlistsService],
})
export class WischlistsModule {}
