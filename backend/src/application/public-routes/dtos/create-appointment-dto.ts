import { IsTimeFormat } from '@src/application/shared/decorators/time-validator.decorator';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsOptional()
  @IsMongoId()
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
  @IsMongoId()
  scheduleId: string;

  @IsTimeFormat()
  @IsNotEmpty()
  timeSelected: string;

  @IsString()
  @IsNotEmpty()
  notes: string;
}
