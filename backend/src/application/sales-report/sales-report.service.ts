import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { CreateSalesReportDto } from './dtos/create-sales-report-dto';
import { SalesReportRepository } from '@domain/repositories/sales-report.repository';

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
    dateSelected,
    timeDuration,
    appointmentId,
  }: CreateSalesReportDto) {
    return await this.salesReportRepository.create({
      managerId,
      phone,
      price,
      dateSelected,
      timeDuration,
      appointmentId,
    });
  }

  async getSales({ managerId, date }: { managerId: string; date: string }) {
    return await this.salesReportRepository.getSalesByMonth({
      managerId,
      date,
    });
  }
}
