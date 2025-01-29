import { IsArrayOfMongoIds } from '@/application/shared/decorators/array-valid-mongoid.decorator';
import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteScheduleDto {
  @IsArray({ message: 'O campo schedulesIds deve ser um array.' })
  @Type(() => String)
  @IsArrayOfMongoIds({
    message: 'Cada ID em schedulesIds deve ser um ID MongoDB válido.',
  })
  schedulesIds: string[];

  @IsNotEmpty({ message: 'O campo userId não pode estar vazio.' })
  @IsMongoId({ message: 'O campo userId deve ser um ID MongoDB válido.' })
  userId: string;
}
