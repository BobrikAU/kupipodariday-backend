import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WischesService } from './wisches.service';
import { CreateWischDto } from './dto/create-wisch.dto';
import { UpdateWischDto } from './dto/update-wisch.dto';

@Controller('wisches')
export class WischesController {
  constructor(private readonly wischesService: WischesService) {}

  @Post()
  create(@Body() createWischDto: CreateWischDto) {
    return this.wischesService.create(createWischDto);
  }

  @Get()
  findAll() {
    return this.wischesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wischesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWischDto: UpdateWischDto) {
    return this.wischesService.update(+id, updateWischDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wischesService.remove(+id);
  }
}
