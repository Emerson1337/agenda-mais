import { CreateAppointmentDto } from '@src/application/public-routes/dtos/create-appointment-dto';

import { Appointments } from '../entities/appointment.entity';

export abstract class AppointmentsRepository {
  abstract create(appointment: CreateAppointmentDto): Promise<Appointments>;
  abstract findByTimeAndDateAndManagerId({
    time,
    date,
    managerId,
  }: {
    time: string;
    date: string;
    managerId: string;
  }): Promise<Appointments>;
  abstract deleteByAppointmentCode(
    appointmentCode: string,
  ): Promise<Appointments | null>;
  abstract deleteByAppointmentCode(
    appointmentCode: string,
  ): Promise<Appointments | null>;
  abstract findActiveByAppointmentCode({
    code,
    managerId,
  }: {
    code: string;
    managerId: string;
  }): Promise<Appointments | null>;
  abstract getByScheduleId({
    scheduleId,
    managerId,
  }: {
    scheduleId: string;
    managerId: string;
  }): Promise<Appointments>;
  abstract getByManagerId(managerId: string): Promise<Appointments[]>;
}
