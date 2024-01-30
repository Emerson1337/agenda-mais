import { Injectable } from '@nestjs/common';
import { Schedules } from '@src/domain/entities/schedules.entity copy';
import { BookingManagersRepository } from '@src/domain/repositories/booking-managers.repository';
import { SchedulesRepository } from '@src/domain/repositories/schedules.repository';

import { removeAttributes } from '../shared/utils/objectFormatter';

@Injectable()
export class AvailableDatesService {
  constructor(
    private scheduleRepository: SchedulesRepository,
    private bookingManagerRepository: BookingManagersRepository,
  ) {}

  async list(username: string, query: { date: string }): Promise<Schedules[]> {
    const manager =
      await this.bookingManagerRepository.findByUsername(username);

    const schedules = (
      await this.scheduleRepository.getAllByDate(manager.id, query.date)
    ).map((schedule) => {
      return {
        ...removeAttributes<Schedules>(schedule, ['createdAt', 'updatedAt']),
        times: schedule.times.filter((time) => time.available),
      };
    });

    return schedules;
  }
}
