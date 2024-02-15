import { Schedules } from '@src/domain/entities/schedules.entity';
import { Column, Entity } from 'typeorm';

import BaseEntityMDB from './config/base.entity';

class SchedulesTime {
  @Column({ type: 'string' })
  time: string;

  @Column({ type: 'boolean' })
  available: boolean;
}

@Entity('Schedules')
export class SchedulesMDB extends BaseEntityMDB implements Schedules {
  @Column({ type: 'string' })
  managerId: string;

  @Column({ type: 'string' })
  date: string;

  @Column({ type: 'array' })
  times: SchedulesTime[];
}
