import { CreateScheduleDto } from '@src/application/schedules/dtos/create-schedule.dto';

import { Schedules } from '../entities/schedules.entity copy';

export abstract class SchedulesRepository {
  abstract createOrUpdate(
    managerId: string,
    scheduleDate: CreateScheduleDto,
  ): Promise<Schedules>;
  abstract getAll(managerId: string): Promise<Schedules[]>;
  abstract getAllByDate(managerId: string, date: string): Promise<Schedules[]>;
}
