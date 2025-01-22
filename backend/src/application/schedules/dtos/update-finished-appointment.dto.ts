import { IsString, IsEnum } from 'class-validator';
import { AppointmentStatus } from '@/domain/entities/enums/appointment-status.enum';

export class UpdateFinishedAppointmentDto {
  @IsString()
  code: string;
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}
