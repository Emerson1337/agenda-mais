import { Injectable } from '@nestjs/common';
import { Schedules } from '@/domain/entities/schedules.entity';
import { AppointmentsRepository } from '@/domain/repositories/appointments.repository';
import { SchedulesRepository } from '@/domain/repositories/schedules.repository';
import { CreateScheduleDto } from './dtos/create-schedule.dto';
import { DeleteScheduleDto } from './dtos/delete-schedule.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Appointments } from '@/domain/entities/appointment.entity';
import { IDelete } from './dtos/types';
import { SalesReportService } from '@/application/sales-report/sales-report.service';
import { ManagerServicesRepository } from '@/domain/repositories/manager-services.repository';
import { AppointmentStatus } from '@/domain/entities/enums/appointment-status.enum';

@Injectable()
export class SchedulesService {
  constructor(
    private readonly schedulesRepository: SchedulesRepository,
    private readonly managerServicesRepository: ManagerServicesRepository,
    private readonly salesReportService: SalesReportService,
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly i18n: I18nService,
  ) {}

  async createOrUpdate(
    schedule: CreateScheduleDto,
  ): Promise<Schedules | Error> {
    return await this.schedulesRepository.createOrUpdate(
      schedule.managerId,
      schedule,
    );
  }

  async list({ managerId }: { managerId: string }): Promise<Schedules | Error> {
    return await this.schedulesRepository.findByManagerId(managerId);
  }

  async listAppointments({
    managerId,
  }: {
    managerId: string;
  }): Promise<Appointments[] | Error> {
    return await this.appointmentsRepository.getByManagerId(managerId);
  }

  async delete({
    schedulesIds,
    userId,
  }: DeleteScheduleDto): Promise<IDelete | Error> {
    await this.schedulesRepository.deleteSchedules({
      schedulesIds,
      userId,
    });

    return {
      message: this.i18n.t('translations.SCHEDULES.DELETED', {
        lang: I18nContext.current().lang,
      }),
    };
  }

  async cancelAppointment({
    appointmentId,
    userId,
  }: {
    appointmentId: string;
    userId: string;
  }): Promise<Appointments | Error> {
    const appointmentDeleted = await this.appointmentsRepository.deleteById({
      id: appointmentId,
      managerId: userId,
    });

    const service = await this.managerServicesRepository.findById({
      managerId: userId,
      managerServiceId: appointmentDeleted.serviceId,
    });

    await this.salesReportService.update({
      managerId: userId,
      phone: appointmentDeleted.phone,
      price: service.price,
      serviceName: service.name,
      clientName: appointmentDeleted.clientName,
      code: appointmentDeleted.code,
      notes: appointmentDeleted.notes,
      date: appointmentDeleted.date,
      time: appointmentDeleted.time,
      status: AppointmentStatus.CANCELLED,
    });

    return appointmentDeleted;
  }
}
