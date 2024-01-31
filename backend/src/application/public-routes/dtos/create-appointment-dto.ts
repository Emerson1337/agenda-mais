import { IsTimeFormat } from '@src/application/shared/decorators/time-validator.decorator';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsOptional()
  managerId?: string;

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
  scheduleId: string;

  @IsTimeFormat()
  @IsNotEmpty()
  timeSelected: string;

  @IsString()
  @IsNotEmpty()
  notes: string;
}
