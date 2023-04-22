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
import { IdWishDto } from './dto/id-wish.dto';
import { DeleteWishDto } from './dto/delete-wish.dto';
import { UserHelper } from '../users/helpers/user.helper';
import { Request as RequestExpress } from 'express';
import { InvalidData } from '../filters/user-exists.filter';
import {
  UpdateWishErrorFilter,
  EntityNotFoundErrorFilter,
} from '../filters/wish-exicts.filter';
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
  findOne(@Param() params: IdWishDto) {
    return this.wischesService.findOne({ id: params.id });
  }

  @UseFilters(UpdateWishErrorFilter)
  @Patch(':id')
  update(
    @Param() params: IdWishDto,
    @Body() updateWischDto: UpdateWischDto,
    @Request() request: RequestExpress,
  ) {
    const userId = this.userHelper.getUserIdOutRequest(request);
    return this.wischesService.update(params.id, updateWischDto, userId);
  }

  @UseFilters(EntityNotFoundErrorFilter)
  @Delete(':id')
  remove(@Param() params: DeleteWishDto, @Request() request: RequestExpress) {
    const userId = this.userHelper.getUserIdOutRequest(request);
    return this.wischesService.remove(params.id, userId);
  }
}
