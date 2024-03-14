import { Appointments } from '@src/domain/entities/appointment.entity';
import { Column, Entity } from 'typeorm';

import BaseEntityMDB from './config/base.entity';
import { AppointmentStatus } from '@domain/entities/enums/appointment-status.enum';

@Entity('Appointments')
export class AppointmentsMDB extends BaseEntityMDB implements Appointments {
  @Column({ type: 'string' })
  date: string;

  @Column({ type: 'string' })
  clientName: string;

  @Column({ type: 'string' })
  phone: string;

  @Column({ type: 'string' })
  scheduleId: string;

  @Column({ type: 'string' })
  code: string;

  @Column({ type: 'string' })
  time: string;

  @Column({ type: 'string' })
  notes: string;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.ACTIVE,
  })
  status: AppointmentStatus;
}
