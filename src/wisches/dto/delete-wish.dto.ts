import { IsNumberString } from 'class-validator';

export class DeleteWishDto {
  @IsNumberString()
  public id: number;
}
