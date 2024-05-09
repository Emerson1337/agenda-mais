import { CreateScheduleDto } from '@src/application/schedules/dtos/create-schedule.dto';

import { Schedules } from '../entities/schedules.entity';

export abstract class SchedulesRepository {
  abstract createOrUpdate(
    managerId: string,
    scheduleDate: CreateScheduleDto,
  ): Promise<Schedules>;
  abstract findByIdAndTimeAvailable({
    id,
    time,
    weekDay,
    managerId,
  }: {
    id: string;
    time: string;
    weekDay: number;
    managerId: string;
  }): Promise<Schedules>;
  abstract getAll(managerId: string): Promise<Schedules[]>;
  abstract getAllByDate(managerId: string, date: string): Promise<Schedules[]>;
  abstract updateTimeAvailabilityByIdAndTime({
    id,
    time,
    managerId,
  }: {
    id: string;
    time: string;
    managerId: string;
  }): Promise<Schedules>;
  abstract deleteSchedules({
    schedulesIds,
    userId,
  }: {
    schedulesIds: string[];
    userId: string;
  }): Promise<void>;
  abstract makeScheduleAvailableByIdAndTime({
    id,
    managerId,
    time,
  }: {
    id: string;
    managerId: string;
    time: string;
  }): Promise<Schedules>;
}
