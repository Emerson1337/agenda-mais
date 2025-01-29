import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUpdateManagerServiceDto {
  @IsNotEmpty({ message: 'O campo nome não pode estar vazio.' })
  @IsString({ message: 'O campo nome deve ser uma string.' })
  name: string;

  @IsNotEmpty({ message: 'O campo preço não pode estar vazio.' })
  @IsNumber({}, { message: 'O campo preço deve ser um número.' })
  price: number;

  @IsNotEmpty({ message: 'O campo descrição não pode estar vazio.' })
  @IsString({ message: 'O campo descrição deve ser uma string.' })
  description: string;

  @IsNotEmpty({ message: 'O campo duração em minutos não pode estar vazio.' })
  @IsNumber({}, { message: 'O campo duração em minutos deve ser um número.' })
  timeDurationInMinutes: number;
}
