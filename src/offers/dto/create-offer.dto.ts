import { IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsNumber()
  item: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsBoolean()
  hidden: boolean;
}
