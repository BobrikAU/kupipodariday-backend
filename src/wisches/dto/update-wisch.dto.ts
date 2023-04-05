import { PartialType } from '@nestjs/swagger';
import { CreateWischDto } from './create-wisch.dto';

export class UpdateWischDto extends PartialType(CreateWischDto) {}
