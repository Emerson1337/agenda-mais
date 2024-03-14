import { Column, CreateDateColumn, Entity } from 'typeorm';

import BaseEntityMDB from './config/base.entity';
import { SalesReport } from '@domain/entities/sales-report.entity';

@Entity('SalesReport')
export class SalesReportMDB extends BaseEntityMDB implements SalesReport {
  @Column({ type: 'number' })
  price: number;

  @Column({ type: 'string' })
  phone: string;

  @Column({ type: 'string' })
  timeDuration?: string;

  @Column({ type: 'string' })
  managerId: string;

  @Column({ type: 'string' })
  appointmentId: string;

  @Column({ type: 'string' })
  id: string;

  @CreateDateColumn()
  dateSelected: Date;
}
