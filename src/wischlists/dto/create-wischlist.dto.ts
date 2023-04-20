import { IsNotEmpty, Length, IsUrl } from 'class-validator';
import {
  WISHLIST_NAME_LENGTH_MIN,
  WISHLIST_NAME_LENGTH_MAX,
  WISHLIST_DESCRIPTION_LENGTH_MIN,
  WISHLIST_DESCRIPTION_LENGTH_MAX,
} from '../../constants';

export class CreateWischlistDto {
  @IsNotEmpty()
  @Length(WISHLIST_NAME_LENGTH_MIN, WISHLIST_NAME_LENGTH_MAX)
  name: string;

  @IsNotEmpty()
  @Length(WISHLIST_DESCRIPTION_LENGTH_MIN, WISHLIST_DESCRIPTION_LENGTH_MAX)
  description: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;
}
