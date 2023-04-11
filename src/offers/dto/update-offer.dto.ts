import { PartialType } from '@nestjs/swagger';
import { CreateOfferDto } from './create-offer.dto';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateOfferDto {
  @IsOptional()
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  hidden: boolean;
}
// export class UpdateOfferDto extends PartialType(CreateOfferDto) {}
