import { CreateAppointmentDto } from '@src/application/public-routes/dtos/create-appointment-dto';

import { Appointments } from '../entities/appointment.entity';

export abstract class AppointmentsRepository {
  abstract create(appointment: CreateAppointmentDto): Promise<Appointments>;
  abstract deleteByAppointmentCode(
    appointmentCode: string,
  ): Promise<Appointments | null>;
  abstract getByScheduleId(scheduleId: string): Promise<Appointments>;
}
