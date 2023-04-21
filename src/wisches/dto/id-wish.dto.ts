import { IsNumberString } from 'class-validator';

export class IdWishDto {
  @IsNumberString()
  public id: number;
}
