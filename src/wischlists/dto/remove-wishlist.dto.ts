import { IsNumberString } from 'class-validator';

export class RemoveWishList {
  @IsNumberString()
  id: number;
}
