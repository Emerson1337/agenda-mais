import { IsTimeFormat } from '@/application/shared/decorators/time-validator.decorator';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { IsDateFormat } from '@/application/shared/decorators/date-validator.decorator';

export class CreateAppointmentDto {
  @IsOptional()
  @IsMongoId()
  managerId?: string;

  @IsMongoId()
  serviceId: string;

  @IsOptional()
  code?: string;

  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  scheduleId: string;

  @IsTimeFormat()
  @IsNotEmpty()
  time: string;

  @IsDateFormat()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsOptional()
  notes: string;
}
