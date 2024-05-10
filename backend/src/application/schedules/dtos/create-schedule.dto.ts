import { IsDateFormat } from '@/application/shared/decorators/date-validator.decorator';
import { IsTimeFormat } from '@/application/shared/decorators/time-validator.decorator';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { IsArrayTimeFormat } from '@/application/shared/decorators/time-array-validator.decorator';

export class SchedulesTime {
  @IsNotEmpty()
  @IsTimeFormat()
  start: string;

  @IsNotEmpty()
  @IsTimeFormat()
  end: string;
}

export class SchedulesDateExceptions {
  @IsNotEmpty()
  @IsDateFormat()
  date: string;

  @IsNotEmpty()
  @IsArrayTimeFormat()
  @ArrayMinSize(1)
  @ArrayMaxSize(24)
  times: string[];
}

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsOptional()
  @IsMongoId()
  managerId: string;

  @IsNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  @IsArray()
  @IsNumber({}, { each: true })
  weekDays: number[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SchedulesTime)
  timeRange: SchedulesTime;

  @IsNotEmpty()
  @IsArrayTimeFormat()
  @ArrayMinSize(1)
  @ArrayMaxSize(24)
  @IsArray()
  times: string[];

  @IsNotEmpty()
  @IsNumber()
  @Max(12)
  @Min(1)
  monthsAhead: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => SchedulesDateExceptions)
  dateExceptions?: SchedulesDateExceptions[];
}
