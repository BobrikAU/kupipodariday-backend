import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { Request as RequestExpress } from 'express';
import { WischlistsService } from './wischlists.service';
import { CreateWischlistDto } from './dto/create-wischlist.dto';
import { UpdateWischlistDto } from './dto/update-wischlist.dto';
import { FindOneWishList } from './dto/find-one-wishlist.dto';
import { RemoveWishList } from './dto/remove-wishlist.dto';

@Controller('wishlistlists')
export class WischlistsController {
  constructor(private readonly wischlistsService: WischlistsService) {}

  @Post()
  async create(
    @Body() createWischlistDto: CreateWischlistDto,
    @Request() request: RequestExpress,
  ) {
    return await this.wischlistsService.createWishlist(
      createWischlistDto,
      request,
    );
  }

  @Get()
  findAll() {
    return this.wischlistsService.findAllWishlists();
  }

  @Get(':id')
  findOne(@Param() params: FindOneWishList) {
    return this.wischlistsService.findOne({ id: params.id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWischlistDto: UpdateWischlistDto,
  ) {
    return this.wischlistsService.update(+id, updateWischlistDto);
  }

  @Delete(':id')
  remove(@Param() params: RemoveWishList) {
    return this.wischlistsService.remove(params.id);
  }
}
