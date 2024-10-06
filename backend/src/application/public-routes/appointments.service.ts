import { Injectable } from '@nestjs/common';
import { BookingManagersRepository } from '@/domain/repositories/booking-managers.repository';
import { InvalidParamError } from '@/presentation/errors';

import { AppointmentsRepository } from '@domain/repositories/appointments.repository';
import { generateAppointmentCode } from '@/application/shared/utils/dataGenerator';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { SalesReportService } from '@/application/sales-report/sales-report.service';
import { ManagerServicesRepository } from '@domain/repositories/manager-services.repository';
import { DatesService } from './dates.service';
import { AppointmentStatus } from '@/domain/entities/enums/appointment-status.enum';
import { SchedulesRepository } from '@/domain/repositories/schedules.repository';
import {
  IBookAppointment,
  ICancel,
  IGetSlotAvailable,
  IOBookAppointment,
  IOCancel,
  ISlots,
} from './dtos/type';
import { SalesReport } from '@/domain/entities/sales-report.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly datesService: DatesService,
    private readonly managerServicesRepository: ManagerServicesRepository,
    private readonly bookingManagersRepository: BookingManagersRepository,
    private readonly scheduleRepository: SchedulesRepository,
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly salesReportService: SalesReportService,
    private readonly i18n: I18nService,
  ) {}

  async bookAppointment({
    username,
    appointmentData,
  }: IBookAppointment): Promise<IOBookAppointment | Error> {
    const { clientName, phone, scheduleId, notes, time, date, serviceId } =
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

    const { isTimeAvailable, schedule } =
      await this.datesService.checkTimeAvailability({
        id: scheduleId,
        time,
        managerId: manager.id,
        date: appointmentData.date,
      });

    if (!isTimeAvailable) {
      throw new InvalidParamError(
        'scheduleId',
        this.i18n.t('translations.APPOINTMENT.ERROR', {
          lang: I18nContext.current().lang,
        }),
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

    const code = generateAppointmentCode(4);

    const appointment = await this.appointmentsRepository.create({
      managerId: manager.id,
      scheduleId: schedule.id,
      serviceId: service.id,
      time,
      clientName,
      date,
      code,
      notes,
      phone,
    });

    // save appointment as an active one
    await this.salesReportService.create({
      date: appointment.date,
      time: appointment.time,
      managerId: manager.id,
      phone: phone,
      price: service.price,
      timeDuration: service.timeDuration,
    });

    return {
      appointment,
      message: this.i18n.t('translations.APPOINTMENT.CREATED', {
        lang: I18nContext.current().lang,
      }),
    };
  }

  async getSlotsAvailable({
    username,
  }: IGetSlotAvailable): Promise<
    { scheduleId: string; slots: ISlots[] } | Error
  > {
    const manager =
      await this.bookingManagersRepository.findByUsername(username);

    if (!manager)
      throw new InvalidParamError(
        'username',
        this.i18n.t('translations.INVALID_FIELD.MISSING_DATA.USERNAME', {
          lang: I18nContext.current().lang,
        }),
      );

    const schedule = await this.scheduleRepository.findByManagerId(manager.id);

    const monthsAhead = schedule.monthsAhead;

    // get all slots based in the agenda
    const slotsAvailableBySchedule =
      await this.datesService.createDateAndTimeSlots({
        schedule,
        monthsAhead,
      });

    const appointments = await this.appointmentsRepository.getByManagerId(
      manager.id,
    );

    // remove slots already taken by someone
    const slots = slotsAvailableBySchedule.flatMap((slot) => {
      const appointmentInDate = appointments.find(
        (appointment) => appointment.date === slot.date,
      );

      return {
        date: slot.date,
        times: slot.times.filter((time) => time !== appointmentInDate?.time),
      };
    });

    return {
      scheduleId: schedule.id,
      slots,
    };
  }

  public async cancel({
    username,
    appointmentCode,
  }: ICancel): Promise<IOCancel | Error> {
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

    const service = await this.managerServicesRepository.findById({
      managerId: manager.id,
      managerServiceId: appointment.serviceId,
    });

    await this.salesReportService.update({
      managerId: manager.id,
      phone: appointment.phone,
      price: service.price,
      date: appointment.date,
      time: appointment.time,
      status: AppointmentStatus.CANCELLED,
    });

    return {
      appointment,
      message: this.i18n.t('translations.APPOINTMENT.CANCELLED', {
        lang: I18nContext.current().lang,
      }),
    };
  }

  public async getPhoneHistory({
    phone,
    username,
  }: {
    phone: string;
    username: string;
  }): Promise<SalesReport[] | Error> {
    const manager =
      await this.bookingManagersRepository.findByUsername(username);

    if (!manager)
      throw new InvalidParamError(
        'managerUsername',
        this.i18n.t('translations.INVALID_FIELD.MISSING_DATA.USERNAME', {
          lang: I18nContext.current().lang,
        }),
      );

    return await this.salesReportService.getPhoneReports({
      phone,
      managerId: manager.id,
    });
  }
}
