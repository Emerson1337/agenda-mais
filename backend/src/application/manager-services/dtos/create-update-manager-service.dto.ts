import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUpdateManagerServiceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  timeDuration: string;
}
