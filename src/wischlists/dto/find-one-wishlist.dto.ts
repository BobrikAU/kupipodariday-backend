import { IsNumberString } from 'class-validator';

export class FindOneWishList {
  @IsNumberString()
  id: number;
}
