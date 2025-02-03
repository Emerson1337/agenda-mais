import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { CreateOrUpdateSalesReportDto } from './dtos/create-update-sales-report-dto';
import { SalesReportRepository } from '@domain/repositories/sales-report.repository';
import { AppointmentStatus } from '@/domain/entities/enums/appointment-status.enum';
import { IGetSales } from './dtos/types';
import { SalesReport } from '@/domain/entities/sales-report.entity';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
@Injectable()
export class SalesReportService {
  constructor(
    private readonly salesReportRepository: SalesReportRepository,
    private readonly i18n: I18nService,
  ) {}

  async create({
    managerId,
    phone,
    price,
    date,
    serviceName,
    clientName,
    notes,
    code,
    time,
    timeDurationInMinutes,
    status = AppointmentStatus.ACTIVE,
  }: CreateOrUpdateSalesReportDto): Promise<boolean> {
    return await this.salesReportRepository.create({
      managerId,
      phone,
      price,
      date,
      serviceName,
      code,
      clientName,
      notes,
      timeDurationInMinutes,
      status,
      time,
    });
  }

  async update({
    managerId,
    phone,
    price,
    date,
    serviceName,
    clientName,
    notes,
    code,
    time,
    timeDurationInMinutes,
    status = AppointmentStatus.ACTIVE,
  }: CreateOrUpdateSalesReportDto): Promise<boolean> {
    return await this.salesReportRepository.update({
      managerId,
      phone,
      price,
      clientName,
      date,
      code,
      serviceName,
      notes,
      timeDurationInMinutes,
      status,
      time,
    });
  }

  private groupReportsByService(reports: SalesReport[]): {
    totalAppointments: number;
    totalValue: number;
    service: string;
    month: string;
  }[] {
    return Object.values(
      reports.reduce(
        (acc, report) => {
          const serviceKey = report.serviceName;
          const month = format(parseISO(report.date), 'MM-yyyy');

          if (!acc[serviceKey]) {
            acc[serviceKey] = {
              totalAppointments: 0,
              totalValue: 0,
              service: serviceKey,
              month: month,
            };
          }

          acc[serviceKey].totalAppointments += 1;
          acc[serviceKey].totalValue += report.price;

          return acc;
        },
        {} as Record<
          string,
          {
            totalAppointments: number;
            totalValue: number;
            service: string;
            month: string;
          }
        >,
      ),
    );
  }

  private getTotalRevenue(reports: SalesReport[]) {
    return reports.reduce((acc, report) => {
      acc += report.price;
      return acc;
    }, 0);
  }

  private getClientRanking(reports: SalesReport[]) {
    return Object.values(
      reports.reduce(
        (acc, report) => {
          const clientKey = report.phone;

          if (!acc[clientKey]) {
            acc[clientKey] = {
              totalAppointments: 0,
              totalValue: 0,
              phone: clientKey,
              name: report.clientName,
            };
          }

          acc[clientKey].totalAppointments += 1;
          acc[clientKey].totalValue += report.price;

          return acc;
        },
        {} as Record<
          string,
          {
            totalAppointments: number;
            totalValue: number;
            name: string;
            phone: string;
          }
        >,
      ),
    );
  }

  private getReportsByTime(reports: SalesReport[]) {
    const groupedReports = Object.values(
      reports.reduce(
        (acc, report) => {
          const timeKey = report.time;

          if (!acc[timeKey]) {
            acc[timeKey] = {
              totalAppointments: 0,
              totalValue: 0,
              time: timeKey,
            };
          }

          acc[timeKey].totalAppointments += 1;
          acc[timeKey].totalValue += report.price;

          return acc;
        },
        {} as Record<
          string,
          {
            totalAppointments: number;
            totalValue: number;
            time: string;
          }
        >,
      ),
    );

    return groupedReports.sort((a, b) => a.time.localeCompare(b.time));
  }

  async getMonthlySales({ managerId, date }: IGetSales) {
    const appointmentsReports =
      await this.salesReportRepository.getFinishedSalesByMonth({
        managerId,
        date,
      });

    return {
      servicesReportByMonth: this.groupReportsByService(
        appointmentsReports,
      ).map((report) => ({
        ...report,
        totalValue: report.totalValue.toFixed(2),
      })),
      totalRevenue: this.getTotalRevenue(appointmentsReports).toFixed(2),
      topTenClients: this.getClientRanking(appointmentsReports)
        .map((client) => ({
          ...client,
          totalValue: client.totalValue.toFixed(2),
        }))
        .slice(0, 10),
    };
  }

  private revenueByMonth(reports: SalesReport[]) {
    return Object.values(
      reports.reduce(
        (acc, report) => {
          const month = format(parseISO(report.date), 'MM-yyyy', {
            locale: ptBR,
          });

          if (!acc[month]) {
            acc[month] = {
              totalAppointments: 0,
              totalValue: 0,
              month,
            };
          }

          acc[month].totalAppointments += 1;
          acc[month].totalValue += report.price;

          return acc;
        },
        {} as Record<
          string,
          {
            totalAppointments: number;
            totalValue: number;
            month: string;
          }
        >,
      ),
    );
  }

  private getTopServices(reports: SalesReport[]) {
    const reportsByService = Object.values(
      reports.reduce(
        (acc, report) => {
          const serviceKey = report.serviceName;

          if (!acc[serviceKey]) {
            acc[serviceKey] = {
              totalAppointments: 0,
              totalValue: 0,
              service: serviceKey,
            };
          }

          acc[serviceKey].totalAppointments += 1;
          acc[serviceKey].totalValue += report.price;

          return acc;
        },
        {} as Record<
          string,
          {
            totalAppointments: number;
            totalValue: number;
            service: string;
          }
        >,
      ),
    );

    return reportsByService.sort(
      (a, b) => b.totalAppointments - a.totalAppointments,
    );
  }

  async getYearlySales({ managerId }: { managerId: string }) {
    const appointmentsYearlyReports =
      await this.salesReportRepository.getFinishedSalesFromLast12Months({
        managerId,
        date: new Date(),
      });

    return {
      revenueByMonth: this.revenueByMonth(appointmentsYearlyReports)
        .map((report) => ({
          ...report,
          totalValue: report.totalValue.toFixed(2),
        }))
        .slice(0, 12),
      totalRevenue: this.getTotalRevenue(appointmentsYearlyReports).toFixed(2),
      serviceRanking: this.getTopServices(appointmentsYearlyReports)
        .map((report) => ({
          ...report,
          totalValue: report.totalValue.toFixed(2),
        }))
        .slice(0, 10),
      reportsByTime: this.getReportsByTime(appointmentsYearlyReports).map(
        (report) => ({
          ...report,
          totalValue: report.totalValue.toFixed(2),
        }),
      ),
    };
  }

  async getAllSales({ managerId }: { managerId: string }) {
    const finishedAppointmentsReports =
      await this.salesReportRepository.getAllFinishedSalesByManagerId(
        managerId,
      );

    const activeAppointmentsReports =
      await this.salesReportRepository.getAllActiveSalesByManagerId(managerId);

    return {
      totalRevenueRaised: this.getTotalRevenue(
        finishedAppointmentsReports,
      ).toFixed(2),
      totalAppointmentsToBeDone: activeAppointmentsReports.length,
      incomingRevenue: this.getTotalRevenue(activeAppointmentsReports).toFixed(
        2,
      ),
      topTenClients: this.getClientRanking(finishedAppointmentsReports)
        .map((client) => ({
          ...client,
          totalValue: client.totalValue.toFixed(2),
        }))
        .slice(0, 10),
    };
  }

  async getPhoneReports({
    phone,
    managerId,
    limit,
    offset,
  }: {
    phone: string;
    managerId: string;
    limit?: number;
    offset?: number;
  }) {
    return await this.salesReportRepository.getReportsByPhoneAndManagerId({
      phone,
      managerId,
      limit,
      offset,
    });
  }
}
