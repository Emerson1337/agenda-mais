import { CreateAppointmentDto } from '@/application/public-routes/dtos/create-appointment-dto';

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
  abstract deleteById({
    id,
    managerId,
  }: {
    id: string;
    managerId: string;
  }): Promise<Appointments | null>;
  abstract deleteByAppointmentCode(
    appointmentCode: string,
  ): Promise<Appointments | null>;
  abstract findActiveByAppointmentCode({
    code,
    managerId,
    phone,
  }: {
    code: string;
    managerId: string;
    phone: string;
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
