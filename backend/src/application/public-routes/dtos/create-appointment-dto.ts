import { IsTimeFormat } from '@src/application/shared/decorators/time-validator.decorator';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { AppointmentStatus } from '@domain/entities/enums/appointment-status.enum';

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

  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;
}
