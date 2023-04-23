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
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { FindOneOfferDto } from './dto/find-one-offer.dto';
import { DeleteOfferDto } from './dto/delete-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(
    @Body() createOfferDto: CreateOfferDto,
    @Request() request: RequestExpress,
  ) {
    return this.offersService.createOffer(createOfferDto, request);
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneOfferDto) {
    return this.offersService.findOne({ id: params.id });
  }

  /*  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offersService.update(+id, updateOfferDto);
  }

  @Delete(':id')
  remove(@Param() params: DeleteOfferDto) {
    return this.offersService.remove(params.id);
  }  */
}
