import { PartialType } from '@nestjs/swagger';
import { CreateWischDto } from './create-wisch.dto';
import { IsNotEmpty, Length, IsUrl, IsOptional } from 'class-validator';

export class UpdateWischDto {
  @IsOptional()
  @IsNotEmpty()
  @Length(1, 250)
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsOptional()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsNotEmpty()
  @Length(1, 1024)
  description: string;
}

// export class UpdateWischDto extends PartialType(CreateWischDto) {}
