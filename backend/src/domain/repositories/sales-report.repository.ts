import { CreateOrUpdateSalesReportDto } from '@application/sales-report/dtos/create-update-sales-report-dto';
import { SalesReport } from '../entities/sales-report.entity';

export abstract class SalesReportRepository {
  abstract create(report: CreateOrUpdateSalesReportDto): Promise<boolean>;
  abstract update(report: CreateOrUpdateSalesReportDto): Promise<boolean>;
  abstract getSalesByMonth({
    date,
    managerId,
  }: {
    date: string;
    managerId: string;
  }): Promise<SalesReport[] | null>;
  abstract getAllSales(managerId: string): Promise<SalesReport[] | null>;
  abstract cancelSellByAppointmentId(appointmentId: string): Promise<boolean>;
}
