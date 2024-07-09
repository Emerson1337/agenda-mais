import { IsMongoId } from 'class-validator';

export class DeleteAppointmentDto {
  @IsMongoId()
  appointmentId: string;
}
