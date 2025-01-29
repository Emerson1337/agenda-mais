import { IsMongoId } from 'class-validator';

export class DeleteAppointmentDto {
  @IsMongoId({
    message: 'O campo appointmentId deve ser um ID MongoDB válido.',
  })
  appointmentId: string;
}
