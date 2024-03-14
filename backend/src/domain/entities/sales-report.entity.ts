import BaseEntity from './config/base.entity';

export class SalesReport extends BaseEntity {
  managerId: string;
  price: number;
  dateSelected: Date;
  phone: string;
  timeDuration?: string;
}
