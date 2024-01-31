import BaseEntity from './config/base.entity';

export class Appointments extends BaseEntity {
  clientName: string;
  phone: string;
  scheduleId: string;
  time: string;
  notes: string;
}
