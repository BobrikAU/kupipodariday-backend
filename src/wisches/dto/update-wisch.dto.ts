import { PartialType } from '@nestjs/swagger';
import { CreateWischDto } from './create-wisch.dto';
import { IsNotEmpty, Length, IsUrl, IsOptional } from 'class-validator';
import {
  WISH_NAME_LENGTH_MIN,
  WISH_NAME_LENGTH_MAX,
  WISH_DESCRIPTION_LENGTH_MAX,
  WISH_DESCRIPTION_LENGTH_MIN,
} from '../../constants';

export class UpdateWischDto {
  @IsOptional()
  @IsNotEmpty()
  @Length(WISH_NAME_LENGTH_MIN, WISH_NAME_LENGTH_MAX)
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsOptional()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsNotEmpty()
  @Length(WISH_DESCRIPTION_LENGTH_MIN, WISH_DESCRIPTION_LENGTH_MAX)
  description: string;
}

// export class UpdateWischDto extends PartialType(CreateWischDto) {}
