import { Injectable } from '@nestjs/common';
import { BookingManagersRepository } from '@/domain/repositories/booking-managers.repository';
import { InvalidParamError } from '@/presentation/errors';
import { AppointmentsRepository } from '@domain/repositories/appointments.repository';
import { generateAppointmentCode } from '@/application/shared/utils/dataGenerator';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { SalesReportService } from '@/application/sales-report/sales-report.service';
import { ManagerServicesRepository } from '@domain/repositories/manager-services.repository';
import { DatesService } from '@/application/public-routes/dates.service';
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

    const appointmentsAlreadyBooked =
      await this.appointmentsRepository.getAppointmentsFromPhoneNumber({
        phoneNumber: phone,
        managerId: manager.id,
      });

    if (appointmentsAlreadyBooked.length >= 2) {
      throw new InvalidParamError(
        'managerUsername',
        this.i18n.t('translations.APPOINTMENT.LIMIT_REACHED', {
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
    console.log(
      '🟢🟢🟢🟢 manager, schedule, service',
      manager,
      schedule,
      service,
    );

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
      serviceName: service.name,
      clientName: appointment.clientName,
      code: appointment.code,
      notes: appointment.notes,
      phone: phone,
      price: service.price,
      timeDurationInMinutes: service.timeDurationInMinutes,
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
    let slots = slotsAvailableBySchedule
      .map((slot) => {
        const takenTimes = appointments
          .filter((appointment) => appointment.date === slot.date)
          .map((appointment) => appointment.time);

        return {
          date: slot.date,
          times: slot.times.filter((time) => !takenTimes.includes(time)),
        };
      })
      .filter((slot) => !!slot.times.length);

    slots = slots.map((slot) => {
      slot.times = slot.times.sort((a, b) => {
        const [hoursA, minutesA] = a.split(':').map(Number);
        const [hoursB, minutesB] = b.split(':').map(Number);
        return hoursA - hoursB || minutesA - minutesB;
      });
      return slot;
    });

    return {
      scheduleId: schedule.id,
      slots,
    };
  }

  public async cancel({
    username,
    appointmentCode,
    phone,
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
        phone,
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
      code: appointment.code,
      clientName: appointment.clientName,
      serviceName: service.name,
      notes: appointment.notes,
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
    limit,
    offset,
  }: {
    phone: string;
    username: string;
    limit: number;
    offset: number;
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
      limit,
      offset,
    });
  }
}
