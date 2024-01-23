import BaseEntity from './config/base.entity';

export class SchedulesTime {
  time: string;
  available: boolean;
  appointmentId?: boolean;
}

export class Schedules extends BaseEntity {
  date: string;
  times: SchedulesTime;
}
