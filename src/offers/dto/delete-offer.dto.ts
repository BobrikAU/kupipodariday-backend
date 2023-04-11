import { IsNumberString } from 'class-validator';

export class DeleteOfferDto {
  @IsNumberString()
  id: number;
}
