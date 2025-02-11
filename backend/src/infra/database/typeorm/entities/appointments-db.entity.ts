import { Appointments } from '@/domain/entities/appointment.entity';
import { Column, Entity, JoinColumn, OneToOne, ObjectIdColumn } from 'typeorm';

import BaseEntityMDB from './config/base.entity';
import { ManagerServicesMDB } from './manager-service-db.entity';

@Entity('Appointments')
export class AppointmentsMDB extends BaseEntityMDB implements Appointments {
  @Column({ type: 'string' })
  clientName: string;

  @Column({ type: 'string' })
  phone: string;

  @OneToOne(() => ManagerServicesMDB)
  @JoinColumn()
  service: ManagerServicesMDB;

  @ObjectIdColumn()
  serviceId: string;

  @ObjectIdColumn()
  scheduleId: string;

  @ObjectIdColumn()
  managerId: string;

  @Column({ type: 'string' })
  code: string;

  @Column({ type: 'string' })
  time: string;

  @Column({ type: 'string' })
  date: string;

  @Column({ type: 'string' })
  notes: string;
}
