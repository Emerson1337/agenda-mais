import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { CreateOrUpdateSalesReportDto } from './dtos/create-update-sales-report-dto';
import { SalesReportRepository } from '@domain/repositories/sales-report.repository';
import { AppointmentStatus } from '@/domain/entities/enums/appointment-status.enum';
import { IGetSales } from './dtos/types';

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
    time,
    timeDuration,
    status = AppointmentStatus.ACTIVE,
  }: CreateOrUpdateSalesReportDto): Promise<boolean> {
    return await this.salesReportRepository.create({
      managerId,
      phone,
      price,
      date,
      serviceName,
      clientName,
      notes,
      timeDuration,
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
    time,
    timeDuration,
    status = AppointmentStatus.ACTIVE,
  }: CreateOrUpdateSalesReportDto): Promise<boolean> {
    return await this.salesReportRepository.update({
      managerId,
      phone,
      price,
      clientName,
      date,
      serviceName,
      notes,
      timeDuration,
      status,
      time,
    });
  }

  async getSales({ managerId, date }: IGetSales) {
    return await this.salesReportRepository.getSalesByMonth({
      managerId,
      date,
    });
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
