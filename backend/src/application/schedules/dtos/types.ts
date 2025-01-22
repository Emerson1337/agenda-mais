import { SalesReport } from '@/domain/entities/sales-report.entity';

export interface IDelete {
  message: string;
}

export interface IUpdate {
  message: string;
  appointment: SalesReport;
}
