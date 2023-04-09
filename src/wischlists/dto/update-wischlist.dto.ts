import { PartialType } from '@nestjs/swagger';
import { CreateWischlistDto } from './create-wischlist.dto';
import { IsOptional, Length, IsUrl } from 'class-validator';

export class UpdateWischlistDto {
  @IsOptional()
  @Length(1, 250)
  name: string;

  @IsOptional()
  @Length(1, 1500)
  description: string;

  @IsOptional()
  @IsUrl()
  image: string;
}

// export class UpdateWischlistDto extends PartialType(CreateWischlistDto) {}
