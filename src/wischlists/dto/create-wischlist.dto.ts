import { IsNotEmpty, Length, IsUrl } from 'class-validator';

export class CreateWischlistDto {
  @IsNotEmpty()
  @Length(1, 250)
  name: string;

  @IsNotEmpty()
  @Length(1, 1500)
  description: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;
}
