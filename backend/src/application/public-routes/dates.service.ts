import { Injectable } from '@nestjs/common';
import { BookingManagers } from '@/domain/entities/booking-managers.entity';
import { BookingManagersRepository } from '@/domain/repositories/booking-managers.repository';
import { ManagerServicesRepository } from '@/domain/repositories/manager-services.repository';
import { SchedulesRepository } from '@/domain/repositories/schedules.repository';
import { removeAttributes } from '@/application/shared/utils/objectFormatter';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { InvalidParamError } from '@/presentation/errors';
import {
  addDays,
  addMonths,
  differenceInDays,
  endOfToday,
  format,
  getDay,
} from 'date-fns';
import { AppointmentsRepository } from '@/domain/repositories/appointments.repository';
import {
  IBusinessData,
  ICheckTimeAvailability,
  ICreateDateAndTimeSlots,
  ISlots,
  ITimeAvailability,
} from './dtos/type';

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
  }: ICheckTimeAvailability): Promise<ITimeAvailability> {
    const weekDay = Number(format(date, 'e')) - 1; // 0 - monday, 6 - sunday (default behavior: 1 - monday, 7 - sunday)

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

  async createDateAndTimeSlots({
    schedule,
    monthsAhead,
  }: ICreateDateAndTimeSlots): Promise<ISlots[]> {
    const now = endOfToday();
    const end = addMonths(now, monthsAhead);
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    const differenceBetweenDatesInDays = differenceInDays(end, now);
    const datesInSchedule: ISlots[] = [];

    // Create all dates available for scheduling
    for (let index = 0; index <= differenceBetweenDatesInDays; index++) {
      const date = format(addDays(now, index), 'yyyy-MM-dd');

      const availableTimes = schedule.times.filter((time) => {
        const [hour, minute] = time.split(':').map(Number);
        return (
          hour > currentHour ||
          (hour === currentHour && minute > currentMinute) ||
          index !== 0
        );
      });
      // 0 - monday, 6 - sunday
      // TODO: check this logic later
      if (schedule.weekDays.includes(getDay(date)))
        datesInSchedule.push({
          date,
          times: availableTimes,
        });
    }

    // Remove slots that matches the exception times
    const filteredDates = datesInSchedule.flatMap((dateInSchedule) => {
      const exceptionDate = schedule.dateExceptions.find(
        (exception) => exception.date === dateInSchedule.date,
      );

      return {
        date: dateInSchedule.date,
        times: dateInSchedule.times.filter(
          (time) => !exceptionDate?.times.includes(time),
        ),
      };
    });

    return filteredDates.filter((date) => date.times.length);
  }

  async getBusinessData(username: string): Promise<IBusinessData> {
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

    const layoutPalette = manager.palette;

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
        'palette',
      ]),
    };

    return {
      services,
      business,
      layout: layoutPalette,
    };
  }
}
