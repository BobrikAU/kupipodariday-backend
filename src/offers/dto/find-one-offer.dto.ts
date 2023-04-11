import { IsNumberString } from 'class-validator';

export class FindOneOfferDto {
  @IsNumberString()
  id: number;
}
