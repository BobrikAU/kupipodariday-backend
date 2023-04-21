import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { WischesService } from './wisches.service';
import { CreateWischDto } from './dto/create-wisch.dto';
import { UpdateWischDto } from './dto/update-wisch.dto';
import { GetWishDto } from './dto/get-wish.dto';
import { DeleteWishDto } from './dto/delete-wish.dto';
import { UserHelper } from '../users/helpers/user.helper';
import { Request as RequestExpress } from 'express';
import { InvalidData } from '../filters/user-exists.filter';
import { FindOneResponseInterceptor } from './interceptors/find-one-response.interceptors';

@Controller('wishes')
export class WischesController {
  constructor(
    private readonly wischesService: WischesService,
    private readonly userHelper: UserHelper,
  ) {}

  @UseFilters(InvalidData)
  @Post()
  create(
    @Body() createWischDto: CreateWischDto,
    @Request() request: RequestExpress,
  ) {
    const ownerId = this.userHelper.getUserIdOutRequest(request);
    return this.wischesService.create(createWischDto, ownerId);
  }

  @Get('last')
  findAllLast() {
    return this.wischesService.findAllLast();
  }

  @Get('top')
  findAllTop() {
    return this.wischesService.findAllTop();
  }

  @UseInterceptors(FindOneResponseInterceptor)
  @Get(':id')
  findOne(@Param() params: GetWishDto) {
    return this.wischesService.findOne({ id: params.id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWischDto: UpdateWischDto) {
    return this.wischesService.update(+id, updateWischDto);
  }

  @Delete(':id')
  remove(@Param() params: DeleteWishDto) {
    return this.wischesService.remove(params.id);
  }
}
