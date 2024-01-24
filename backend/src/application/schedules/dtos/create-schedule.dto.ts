import { IsDateFormat } from '@src/application/shared/decorators/date-validator.decorator';
import { IsTimeFormat } from '@src/application/shared/decorators/time-validator.decorator';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SchedulesTime {
  @IsNotEmpty()
  @IsTimeFormat()
  time: string;

  @IsNotEmpty()
  @IsBoolean()
  available: boolean;

  @IsString()
  @IsOptional()
  appointmentId?: boolean;
}

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  managerId: string;

  @IsNotEmpty()
  @IsDateString()
  @IsDateFormat()
  date: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SchedulesTime)
  times: SchedulesTime[];
}
