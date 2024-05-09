import BaseEntity from '@src/domain/entities/config/base.entity';
import { AppointmentStatus } from '@src/domain/entities/enums/appointment-status.enum';

export class SalesReport extends BaseEntity {
  managerId: string;
  price: number;
  date: string;
  time: string;
  phone: string;
  timeDuration?: string;
  status: AppointmentStatus;
}
