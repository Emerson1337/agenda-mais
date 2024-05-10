import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { CreateOrUpdateSalesReportDto } from './dtos/create-update-sales-report-dto';
import { SalesReportRepository } from '@domain/repositories/sales-report.repository';
import { AppointmentStatus } from '@/domain/entities/enums/appointment-status.enum';

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
    time,
    timeDuration,
    status = AppointmentStatus.ACTIVE,
  }: CreateOrUpdateSalesReportDto) {
    return await this.salesReportRepository.create({
      managerId,
      phone,
      price,
      date,
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
    time,
    timeDuration,
    status = AppointmentStatus.ACTIVE,
  }: CreateOrUpdateSalesReportDto) {
    return await this.salesReportRepository.update({
      managerId,
      phone,
      price,
      date,
      timeDuration,
      status,
      time,
    });
  }

  async getSales({ managerId, date }: { managerId: string; date: string }) {
    return await this.salesReportRepository.getSalesByMonth({
      managerId,
      date,
    });
  }
}
