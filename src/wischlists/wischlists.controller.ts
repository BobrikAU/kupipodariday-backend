import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WischlistsService } from './wischlists.service';
import { CreateWischlistDto } from './dto/create-wischlist.dto';
import { UpdateWischlistDto } from './dto/update-wischlist.dto';
import { FindOneWishList } from './dto/find-one-wishlist.dto';
import { RemoveWishList } from './dto/remove-wishlist.dto';

@Controller('wischlists')
export class WischlistsController {
  constructor(private readonly wischlistsService: WischlistsService) {}

  @Post()
  create(@Body() createWischlistDto: CreateWischlistDto) {
    return this.wischlistsService.create(createWischlistDto);
  }

  @Get()
  findAll() {
    return this.wischlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneWishList) {
    return this.wischlistsService.findOne(params.id);
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
