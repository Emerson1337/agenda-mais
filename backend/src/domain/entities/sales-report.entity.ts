import BaseEntity from '@/domain/entities/config/base.entity';
import { AppointmentStatus } from '@/domain/entities/enums/appointment-status.enum';

export class SalesReport extends BaseEntity {
  managerId: string;
  price: number;
  date: string;
  time: string;
  phone: string;
  code: string;
  serviceName: string;
  notes: string;
  timeDurationInMinutes?: number;
  status: AppointmentStatus;
}
