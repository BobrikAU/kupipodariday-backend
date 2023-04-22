import { IsNumberString } from 'class-validator';

export class CopyWishDto {
  @IsNumberString()
  id: number;
}
