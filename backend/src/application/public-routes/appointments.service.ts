import { Injectable } from '@nestjs/common';
import { Appointments } from '@src/domain/entities/appointment.entity';
import { BookingManagersRepository } from '@src/domain/repositories/booking-managers.repository';
import { SchedulesRepository } from '@src/domain/repositories/schedules.repository';
import { InvalidParamError } from '@src/presentation/errors';

import { AppointmentsRepository } from '@domain/repositories/appointments.repository';
import { generateAppointmentCode } from '../shared/utils/dataGenerator';
import { CreateAppointmentDto } from './dtos/create-appointment-dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { SalesReportService } from '../sales-report/sales-report.service';
import { ManagerServicesRepository } from '@domain/repositories/manager-services.repository';
import { SalesReportRepository } from '@domain/repositories/sales-report.repository';
import { AppointmentStatus } from '@domain/entities/enums/appointment-status.enum';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly scheduleRepository: SchedulesRepository,
    private readonly salesReportRepository: SalesReportRepository,
    private readonly managerServicesRepository: ManagerServicesRepository,
    private readonly bookingManagersRepository: BookingManagersRepository,
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly salesReportService: SalesReportService,
    private readonly i18n: I18nService,
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
    const { clientName, phone, scheduleId, notes, time, serviceId } =
      appointmentData;

    const manager =
      await this.bookingManagersRepository.findByUsername(username);

    if (!manager) {
      throw new InvalidParamError(
        'managerUsername',
        this.i18n.t('translations.INVALID_FIELD.MISSING_DATA.USERNAME', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const schedule = await this.scheduleRepository.findByIdAndTimeAvailable({
      id: scheduleId,
      time,
      managerId: manager.id,
    });

    if (!schedule) {
      throw new InvalidParamError(
        'scheduleId',
        this.i18n.t(
          'translations.INVALID_FIELD.MISSING_DATA.GENERIC_NOT_FOUND',
          {
            lang: I18nContext.current().lang,
          },
        ),
      );
    }

    const service = await this.managerServicesRepository.findById({
      managerServiceId: serviceId,
      managerId: manager.id,
    });

    if (!service) {
      throw new InvalidParamError(
        'serviceId',
        this.i18n.t(
          'translations.INVALID_FIELD.MISSING_DATA.GENERIC_NOT_FOUND',
          {
            lang: I18nContext.current().lang,
          },
        ),
      );
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
      serviceId,
      time,
      clientName,
      status: AppointmentStatus.ACTIVE,
      code,
      notes,
      phone,
    });

    await this.salesReportService.create({
      dateSelected: new Date(schedule.date),
      managerId: manager.id,
      phone: phone,
      price: service.price,
      appointmentId: appointment.id,
    });

    return {
      appointment,
      message: this.i18n.t('translations.APPOINTMENT.CREATED', {
        lang: I18nContext.current().lang,
      }),
    };
  }

  public async cancel({
    username,
    appointmentCode,
  }: {
    username: string;
    appointmentCode: string;
  }): Promise<{ appointment: Appointments; message: string }> {
    const manager =
      await this.bookingManagersRepository.findByUsername(username);

    if (!manager)
      throw new InvalidParamError(
        'managerUsername',
        this.i18n.t('translations.INVALID_FIELD.MISSING_DATA.USERNAME', {
          lang: I18nContext.current().lang,
        }),
      );

    const appointment =
      await this.appointmentsRepository.findActiveByAppointmentCode({
        code: appointmentCode,
        managerId: manager.id,
      });

    if (!appointment)
      throw new InvalidParamError(
        'appointmentCode',
        this.i18n.t('translations.INVALID_FIELD.MISSING_DATA.APPOINTMENT', {
          lang: I18nContext.current().lang,
        }),
      );

    await this.appointmentsRepository.deleteByAppointmentCode(appointmentCode);

    await this.scheduleRepository.makeScheduleAvailableByIdAndTime({
      id: appointment.scheduleId,
      managerId: manager.id,
      time: appointment.time,
    });

    await this.salesReportRepository.cancelSellByAppointmentId(appointment.id);

    return {
      appointment,
      message: this.i18n.t('translations.APPOINTMENT.CANCELED', {
        lang: I18nContext.current().lang,
      }),
    };
  }
}
