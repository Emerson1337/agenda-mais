import BaseEntity from './config/base.entity';

export class SchedulesTimeRange {
  start: string;
  end: string;
}

export class SchedulesDateException {
  date: string;
  times: string[];
}

export class Schedules extends BaseEntity {
  managerId: string;
  weekDays: number[];
  times: string[];
  monthsAhead: number;
  timeRange: SchedulesTimeRange;
  dateExceptions?: SchedulesDateException[];
  gapTimeInMinutes: number;
}
