import { Schedules } from '@src/domain/entities/schedules.entity';
import { Column, Entity } from 'typeorm';

import BaseEntityMDB from './config/base.entity';

class SchedulesTimeRange {
  @Column({ type: 'string' })
  start: string;

  @Column({ type: 'string' })
  end: string;
}

class SchedulesDateException {
  @Column({ type: 'string' })
  date: string;

  @Column({ type: 'array' })
  times: string[];
}

@Entity('Schedules')
export class SchedulesMDB extends BaseEntityMDB implements Schedules {
  @Column({ type: 'string' })
  managerId: string;

  @Column({ type: 'array' })
  weekDays: number[];

  @Column({ type: 'array' })
  times: string[];

  @Column({ type: 'array' })
  timeRange: SchedulesTimeRange;

  @Column({ type: 'array' })
  dateExceptions?: SchedulesDateException[];
}
