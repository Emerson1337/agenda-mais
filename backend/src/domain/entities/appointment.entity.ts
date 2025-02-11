import BaseEntity from './config/base.entity';
import { ManagerServices } from './manager-services.entity';

export class Appointments extends BaseEntity {
  clientName: string;
  phone: string;
  scheduleId: string;
  serviceId: string;
  managerId: string;
  service: ManagerServices;
  time: string;
  date: string;
  notes: string;
  code: string;
}
