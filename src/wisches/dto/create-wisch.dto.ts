import { IsNotEmpty, Length, IsUrl } from 'class-validator';
import {
  WISH_NAME_LENGTH_MIN,
  WISH_NAME_LENGTH_MAX,
  WISH_DESCRIPTION_LENGTH_MAX,
  WISH_DESCRIPTION_LENGTH_MIN,
} from '../../constants';

export class CreateWischDto {
  @IsNotEmpty()
  @Length(WISH_NAME_LENGTH_MIN, WISH_NAME_LENGTH_MAX)
  name: string;

  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @Length(WISH_DESCRIPTION_LENGTH_MIN, WISH_DESCRIPTION_LENGTH_MAX)
  description: string;
}
