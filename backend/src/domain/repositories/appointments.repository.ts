import { Appointments } from '../entities/appointment.entity';
import { CreateAppointmentDto } from '@src/application/public-routes/dtos/create-appointment-dto';

export abstract class AppointmentsRepository {
  abstract create(appointment: CreateAppointmentDto): Promise<Appointments>;
}
