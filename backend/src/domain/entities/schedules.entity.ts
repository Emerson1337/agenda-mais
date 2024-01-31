import BaseEntity from './config/base.entity';

export class SchedulesTime {
  time: string;
  available: boolean;
}

export class Schedules extends BaseEntity {
  date: string;
  times: SchedulesTime[];
}
