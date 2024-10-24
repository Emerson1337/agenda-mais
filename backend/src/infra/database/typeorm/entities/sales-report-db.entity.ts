import { Column, Entity } from 'typeorm';

import { SalesReport } from '@domain/entities/sales-report.entity';
import { AppointmentStatus } from '@/domain/entities/enums/appointment-status.enum';
import BaseEntityMDB from './config/base.entity';

@Entity('SalesReport')
export class SalesReportMDB extends BaseEntityMDB implements SalesReport {
  @Column({ type: 'number' })
  price: number;

  @Column({ type: 'string' })
  phone: string;

  @Column({ type: 'number' })
  timeDurationInMinutes?: number;

  @Column({ type: 'string' })
  managerId: string;

  @Column({ type: 'string' })
  appointmentId: string;

  @Column({ type: 'string' })
  date: string;

  @Column({ type: 'string' })
  time: string;

  @Column({ type: 'string' })
  clientName: string;

  @Column({ type: 'string' })
  code: string;

  @Column({ type: 'string' })
  serviceName: string;

  @Column({ type: 'string' })
  notes: string;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.ACTIVE,
  })
  status: AppointmentStatus;
}
