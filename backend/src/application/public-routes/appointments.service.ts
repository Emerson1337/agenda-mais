import { Injectable } from '@nestjs/common';
import { Appointments } from '@src/domain/entities/appointment.entity';
import { BookingManagersRepository } from '@src/domain/repositories/booking-managers.repository';
import { SchedulesRepository } from '@src/domain/repositories/schedules.repository';
import { InvalidParamError } from '@src/presentation/errors';

import { AppointmentsRepository } from '../../domain/repositories/appointments.repository';
import { generateAppointmentCode } from '../shared/utils/dataGenerator';
import { CreateAppointmentDto } from './dtos/create-appointment-dto';

@Injectable()
export class AppointmentsService {
  constructor(
    private scheduleRepository: SchedulesRepository,
    private bookingManagersRepository: BookingManagersRepository,
    private appointmentsRepository: AppointmentsRepository,
  ) {}

  async bookAppointment({
    username,
    appointmentData,
  }: {
    username: string;
    appointmentData: CreateAppointmentDto;
  }): Promise<{
    appointment: Appointments;
    message: string;
  }> {
    const { clientName, phone, scheduleId, notes, time } = appointmentData;

    const manager =
      await this.bookingManagersRepository.findByUsername(username);

    const schedule = await this.scheduleRepository.findByIdAndTimeAvailable({
      id: scheduleId,
      time,
      managerId: manager.id,
    });

    if (!schedule) {
      throw new InvalidParamError('scheduleId', 'Invalid schedule.');
    }

    await this.scheduleRepository.updateTimeAvailabilityByIdAndTime({
      id: scheduleId,
      time,
      managerId: manager.id,
    });

    const code = generateAppointmentCode(4);

    const appointment = await this.appointmentsRepository.create({
      managerId: manager.id,
      scheduleId: schedule.id,
      time,
      clientName,
      code,
      notes,
      phone,
    });

    return {
      appointment,
      message: 'Appointment booked!',
    };
  }

  public async cancel({
    username,
    appointmentCode,
  }: {
    username: string;
    appointmentCode: string;
  }): Promise<{ appointment: Appointments; message: string }> {
    const appointment =
      await this.appointmentsRepository.deleteByAppointmentCode(
        appointmentCode,
      );

    if (!appointment)
      throw new InvalidParamError(
        'appointmentCode',
        'Invalid appointment code provided.',
      );

    const manager =
      await this.bookingManagersRepository.findByUsername(username);

    if (!manager)
      throw new InvalidParamError(
        'managerUsername',
        'Invalid manager username provided.',
      );

    await this.scheduleRepository.makeScheduleAvailableByIdAndTime({
      id: appointment.scheduleId,
      managerId: manager.id,
      time: appointment.time,
    });

    return {
      appointment,
      message: 'Appointment canceled!',
    };
  }
}
