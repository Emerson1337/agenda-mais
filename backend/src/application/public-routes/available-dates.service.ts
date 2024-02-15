import { Injectable } from '@nestjs/common';
import { BookingManagers } from '@src/domain/entities/booking-managers.entity';
import { ManagerServices } from '@src/domain/entities/manager-services.entity';
import { Schedules } from '@src/domain/entities/schedules.entity';
import { BookingManagersRepository } from '@src/domain/repositories/booking-managers.repository';
import { ManagerServicesRepository } from '@src/domain/repositories/manager-services.repository';
import { SchedulesRepository } from '@src/domain/repositories/schedules.repository';

import { removeAttributes } from '../shared/utils/objectFormatter';

@Injectable()
export class AvailableDatesService {
  constructor(
    private scheduleRepository: SchedulesRepository,
    private bookingManagersRepository: BookingManagersRepository,
    private managerServicesRepository: ManagerServicesRepository,
  ) {}

  async list({
    username,
    query,
  }: {
    username: string;
    query: { date: string };
  }): Promise<Schedules[]> {
    const manager =
      await this.bookingManagersRepository.findByUsername(username);

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

  async getBusinessData(username: string): Promise<{
    services: ManagerServices[];
    business: BookingManagers;
    layout: string;
  }> {
    const manager =
      await this.bookingManagersRepository.findByUsername(username);

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
