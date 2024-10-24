import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { AppointmentStatus } from '@/domain/entities/enums/appointment-status.enum';
import { IsDateFormat } from '@/application/shared/decorators/date-validator.decorator';
import { IsTimeFormat } from '@/application/shared/decorators/time-validator.decorator';

export class CreateOrUpdateSalesReportDto {
  @IsString()
  @IsMongoId()
  managerId: string;

  @IsNumber()
  price: number;

  @IsDateFormat()
  date: string;

  @IsTimeFormat()
  time: string;

  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  clientName: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  serviceName: string;

  @IsNotEmpty()
  notes: string;

  @IsOptional()
  timeDurationInMinutes?: number;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;
}
