import BaseEntity from './config/base.entity';
import { AppointmentStatus } from './enums/appointment-status.enum';

export class Appointments extends BaseEntity {
  clientName: string;
  phone: string;
  scheduleId: string;
  time: string;
  notes: string;
  code: string;
  status: AppointmentStatus;
}
