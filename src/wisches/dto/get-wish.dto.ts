import { IsNumberString } from 'class-validator';

export class GetWishDto {
  @IsNumberString()
  public id: number;
}
