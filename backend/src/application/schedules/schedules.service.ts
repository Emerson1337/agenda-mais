import { Injectable } from '@nestjs/common';
import { Schedules } from '@/domain/entities/schedules.entity';
import { AppointmentsRepository } from '@/domain/repositories/appointments.repository';
import { SchedulesRepository } from '@/domain/repositories/schedules.repository';
import { CreateScheduleDto } from './dtos/create-schedule.dto';
import { DeleteScheduleDto } from './dtos/delete-schedule.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Appointments } from '@/domain/entities/appointment.entity';
import { IDelete, IUpdate } from '@/application/schedules/dtos/types';
import { AppointmentStatus } from '@/domain/entities/enums/appointment-status.enum';
import { SalesReportRepository } from '@/domain/repositories/sales-report.repository';
import { SalesReport } from '@/domain/entities/sales-report.entity';
import { InvalidParamError } from '../../presentation/errors/invalid-param-error';

@Injectable()
export class SchedulesService {
  constructor(
    private readonly schedulesRepository: SchedulesRepository,
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly salesReportRepository: SalesReportRepository,
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

    const saleReport = await this.salesReportRepository.getSaleReportByCode(
      appointmentDeleted.code,
    );

    await this.salesReportRepository.update({
      managerId: userId,
      phone: appointmentDeleted.phone,
      price: saleReport?.price,
      code: appointmentDeleted.code,
      notes: appointmentDeleted.notes,
      date: appointmentDeleted.date,
      time: appointmentDeleted.time,
      status: AppointmentStatus.CANCELLED,
      clientName: saleReport.clientName,
      serviceName: saleReport.serviceName,
    });

    return appointmentDeleted;
  }

  async getAppointmentsFinished({
    userId,
    limit,
    offset,
  }: {
    userId: string;
    limit: number;
    offset: number;
  }): Promise<SalesReport[] | Error> {
    return await this.salesReportRepository.getFinishedAppointmentsByManagerId({
      managerId: userId,
      limit,
      offset,
    });
  }

  async updateFinishedAppointment({
    code,
    status,
    managerId,
  }: {
    code: string;
    status: AppointmentStatus;
    managerId: string;
  }): Promise<IUpdate | Error> {
    if (status == AppointmentStatus.ACTIVE) {
      throw new InvalidParamError(
        'status',
        this.i18n.t('translations.INVALID_FIELD.INVALID_STATUS', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const appointmentByCode =
      await this.salesReportRepository.getSaleReportByCode(code);

    if (!appointmentByCode) {
      throw new InvalidParamError(
        'code',
        this.i18n.t(
          'translations.INVALID_FIELD.MISSING_DATA.GENERIC_NOT_FOUND',
          {
            lang: I18nContext.current().lang,
          },
        ),
      );
    }

    const appointment =
      await this.salesReportRepository.updateFinishedAppointmentByCodeAndManagerId(
        {
          code,
          status,
          managerId,
        },
      );

    return {
      message: this.i18n.t('translations.APPOINTMENT.UPDATED', {
        lang: I18nContext.current().lang,
      }),
      appointment,
    };
  }
}
