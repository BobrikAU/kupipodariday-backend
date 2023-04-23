import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { Request as RequestExpress } from 'express';
import { WischlistsService } from './wischlists.service';
import { CreateWischlistDto } from './dto/create-wischlist.dto';
import { UpdateWischlistDto } from './dto/update-wischlist.dto';
import { FindOneWishList } from './dto/find-one-wishlist.dto';
import { RemoveWishList } from './dto/remove-wishlist.dto';
import { RestrictionUserInfoWishlistInterceptor } from './interceptors/restriction-user-info-wishlist.interceptor';

@Controller('wishlistlists')
export class WischlistsController {
  constructor(private readonly wischlistsService: WischlistsService) {}

  @UseInterceptors(RestrictionUserInfoWishlistInterceptor)
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
    return this.wischlistsService.findeOnWishlist(params.id);
  }

  @UseInterceptors(RestrictionUserInfoWishlistInterceptor)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWischlistDto: UpdateWischlistDto,
  ) {
    return this.wischlistsService.updateWishlist(+id, updateWischlistDto);
  }

  @UseInterceptors(RestrictionUserInfoWishlistInterceptor)
  @Delete(':id')
  remove(@Param() params: RemoveWishList) {
    return this.wischlistsService.removeWishlist({ id: params.id });
  }
}
