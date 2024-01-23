import { Schedules } from '../entities/schedules.entity copy';

export abstract class SchedulesRepository {
  abstract create(scheduleDate: Schedules): Promise<Schedules>;
}
