import { Injectable } from '@nestjs/common';
import { BookingManagers } from '@src/domain/entities/booking-managers.entity';
import { Schedules } from '@src/domain/entities/schedules.entity copy';
import { BookingManagersRepository } from '@src/domain/repositories/booking-managers.repository';
import { SchedulesRepository } from '@src/domain/repositories/schedules.repository';
import { InvalidParamError } from '@src/presentation/errors';
import { removeAttributes } from '../shared/utils/objectFormatter';

@Injectable()
export class AvailableDatesService {
  constructor(
    private scheduleRepository: SchedulesRepository,
    private bookingManagerRepository: BookingManagersRepository,
  ) {}

  async list(username: string): Promise<
    | {
        manager: BookingManagers;
        schedules: Schedules[];
      }
    | Error
  > {
    const manager = removeAttributes<BookingManagers>(
      await this.bookingManagerRepository.findByUsername(username),
      [
        'password',
        'roles',
        'appointmentsPerPhone',
        'createdAt',
        'updatedAt',
        'googleId',
        'plan',
        'status',
        'welcomeMessage',
      ],
    );

    if (!manager)
      throw new InvalidParamError('username', 'Username not found.');

    const schedules = (await this.scheduleRepository.getAll(manager.id)).map(
      (schedule) => {
        return {
          ...schedule,
          times: schedule.times.filter((time) => time.available),
        };
      },
    );

    return {
      manager,
      schedules,
    };
  }
}
