import { CreateOrUpdateSalesReportDto } from '@application/sales-report/dtos/create-update-sales-report-dto';
import { SalesReport } from '../entities/sales-report.entity';

export abstract class SalesReportRepository {
  abstract create(report: CreateOrUpdateSalesReportDto): Promise<boolean>;
  abstract update(report: CreateOrUpdateSalesReportDto): Promise<boolean>;
  abstract getFinishedSalesByMonth({
    date,
    managerId,
  }: {
    date: string;
    managerId: string;
  }): Promise<SalesReport[] | null>;
  abstract getFinishedSalesFromLast12Months({
    date,
    managerId,
  }: {
    date: Date;
    managerId: string;
  }): Promise<SalesReport[] | null>;
  abstract getAllFinishedSalesByManagerId(
    managerId: string,
  ): Promise<SalesReport[] | null>;
  abstract getAllActiveSalesByManagerId(
    managerId: string,
  ): Promise<SalesReport[] | null>;
  abstract cancelSellByAppointmentId(appointmentId: string): Promise<boolean>;
  abstract getReportsByPhoneAndManagerId({
    phone,
    managerId,
  }: {
    phone: string;
    managerId: string;
    limit?: number;
    offset?: number;
  }): Promise<SalesReport[]>;
}
