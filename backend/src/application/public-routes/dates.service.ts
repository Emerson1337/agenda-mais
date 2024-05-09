import { Injectable } from '@nestjs/common';
import { BookingManagers } from '@src/domain/entities/booking-managers.entity';
import { ManagerServices } from '@src/domain/entities/manager-services.entity';
import { BookingManagersRepository } from '@src/domain/repositories/booking-managers.repository';
import { ManagerServicesRepository } from '@src/domain/repositories/manager-services.repository';
import { SchedulesRepository } from '@src/domain/repositories/schedules.repository';

import { removeAttributes } from '../shared/utils/objectFormatter';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { InvalidParamError } from '../../presentation/errors';
import { format } from 'date-fns';
import { Schedules } from '../../domain/entities/schedules.entity';
import { AppointmentsRepository } from '../../domain/repositories/appointments.repository';

interface ITimeAvailability {
  id: string;
  time: string;
  managerId: string;
  date: string;
}

@Injectable()
export class DatesService {
  constructor(
    private readonly scheduleRepository: SchedulesRepository,
    private readonly appointmentRepository: AppointmentsRepository,
    private readonly bookingManagersRepository: BookingManagersRepository,
    private readonly managerServicesRepository: ManagerServicesRepository,
    private readonly i18n: I18nService,
  ) {}

  async checkTimeAvailability({
    id,
    time,
    managerId,
    date,
  }: ITimeAvailability): Promise<{
    isTimeAvailable: boolean;
    schedule?: Schedules;
  }> {
    const weekDay = Number(format(date, 'e'));

    const schedule = await this.scheduleRepository.findByIdAndTimeAvailable({
      id,
      time,
      weekDay,
      managerId,
    });

    if (!schedule) {
      return { isTimeAvailable: false };
    }

    const isDateNotAvailable = schedule.dateExceptions?.some(
      (exception) => exception.date === date,
    );

    const isSlotNotAvailable =
      !!(await this.appointmentRepository.findByTimeAndDateAndManagerId({
        time,
        date,
        managerId,
      }));

    return {
      isTimeAvailable: !isSlotNotAvailable && !isDateNotAvailable,
      schedule,
    };
  }

  async getBusinessData(username: string): Promise<{
    services: ManagerServices[];
    business: BookingManagers;
    layout: string;
  }> {
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

    const services = await this.managerServicesRepository.getByManagerId(
      manager.id,
    );

    const business = {
      ...removeAttributes<BookingManagers>(manager, [
        'password',
        'roles',
        'appointmentsPerPhone',
        'createdAt',
        'updatedAt',
        'googleId',
        'plan',
        'status',
      ]),
    };

    return {
      services,
      business,
      layout: 'to do',
    };
  }
}
