import { IsArrayOfMongoIds } from '@/application/shared/decorators/array-valid-mongoid.decorator';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class DeleteScheduleDto {
  @IsArray()
  @Type(() => String)
  @IsArrayOfMongoIds()
  schedulesIds: string[];

  userId: string;
}
