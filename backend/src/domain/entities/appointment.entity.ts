import BaseEntity from './config/base.entity';

export class Appointments extends BaseEntity {
  clientName: string;
  phone: string;
  scheduleId: string;
  serviceId: string;
  time: string;
  date: string;
  notes: string;
  code: string;
}
