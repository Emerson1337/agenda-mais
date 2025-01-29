import { IsString, IsEnum } from 'class-validator';
import { AppointmentStatus } from '@/domain/entities/enums/appointment-status.enum';

export class UpdateFinishedAppointmentDto {
  @IsString({ message: 'O campo código deve ser uma string.' })
  code: string;

  @IsEnum(AppointmentStatus, {
    message: 'O campo status deve ser um valor válido.',
  })
  status: AppointmentStatus;
}
