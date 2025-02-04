import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty } from 'class-validator';

export class DeleteScheduleDto {
  @IsArray({ message: 'O campo schedulesIds deve ser um array.' })
  @Type(() => String)
  schedulesIds: string[];

  @IsNotEmpty({ message: 'O campo userId não pode estar vazio.' })
  userId: string;
}
