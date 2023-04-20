import { IsString } from 'class-validator';

export class FindMyWishesDto {
  @IsString()
  query: string;
}
