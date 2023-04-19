import { PartialType } from '@nestjs/swagger';
import { CreateWischlistDto } from './create-wischlist.dto';
import { IsOptional, Length, IsUrl } from 'class-validator';
import {
  WISHLIST_NAME_LENGTH_MIN,
  WISHLIST_NAME_LENGTH_MAX,
  WISHLIST_DESCRIPTION_LENGTH_MIN,
  WISHLIST_DESCRIPTION_LENGTH_MAX,
} from '../../constants';

export class UpdateWischlistDto {
  @IsOptional()
  @Length(WISHLIST_NAME_LENGTH_MIN, WISHLIST_NAME_LENGTH_MAX)
  name: string;

  @IsOptional()
  @Length(WISHLIST_DESCRIPTION_LENGTH_MIN, WISHLIST_DESCRIPTION_LENGTH_MAX)
  description: string;

  @IsOptional()
  @IsUrl()
  image: string;
}

// export class UpdateWischlistDto extends PartialType(CreateWischlistDto) {}
