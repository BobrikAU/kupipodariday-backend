import { PartialType } from '@nestjs/swagger';
import { CreateWischlistDto } from './create-wischlist.dto';

export class UpdateWischlistDto extends PartialType(CreateWischlistDto) {}
