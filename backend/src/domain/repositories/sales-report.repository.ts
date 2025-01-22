import { CreateOrUpdateSalesReportDto } from '@application/sales-report/dtos/create-update-sales-report-dto';
import { SalesReport } from '@/domain/entities/sales-report.entity';
import { AppointmentStatus } from '@/domain/entities/enums/appointment-status.enum';

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
  abstract getSaleReportByCode(code: string): Promise<SalesReport | null>;
  abstract getSaleReportByCodeAndManagerId({
    code,
    managerId,
  }: {
    code: string;
    managerId: string;
  }): Promise<SalesReport | null>;
  abstract setFinishedStatusByCode(code: string): Promise<SalesReport>;
  abstract getFinishedAppointmentsByManagerId({
    managerId,
    limit,
    offset,
  }: {
    managerId: string;
    limit: number;
    offset: number;
  }): Promise<SalesReport[]>;
  abstract updateFinishedAppointmentByCodeAndManagerId({
    managerId,
    code,
    status,
  }: {
    managerId: string;
    code: string;
    status: AppointmentStatus;
  }): Promise<SalesReport>;
}
