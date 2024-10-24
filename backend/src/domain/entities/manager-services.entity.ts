import BaseEntity from './config/base.entity';

export class ManagerServices extends BaseEntity {
  name: string;
  price: number;
  description: string;
  timeDurationInMinutes: number;
}
