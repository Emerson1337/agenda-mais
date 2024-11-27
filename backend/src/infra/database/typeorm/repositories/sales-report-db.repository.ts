import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { TypeormService } from '../typeorm.service';
import { SalesReportRepository } from '@domain/repositories/sales-report.repository';
import { CreateOrUpdateSalesReportDto } from '@application/sales-report/dtos/create-update-sales-report-dto';
import { SalesReportMDB } from '../entities/sales-report-db.entity';
import { SalesReport } from '@domain/entities/sales-report.entity';
import { ObjectId } from 'mongodb';
import { getMonth, getYear } from 'date-fns';
import { AppointmentStatus } from '@/domain/entities/enums/appointment-status.enum';

@Injectable()
export class TypeOrmSalesReportRepository implements SalesReportRepository {
  repository: MongoRepository<SalesReportMDB>;

  constructor(private typeormService: TypeormService) {
    this.repository = typeormService.getMongoRepository(SalesReportMDB);
  }
  async getSaleReportByCode(code: string): Promise<SalesReport | null> {
    return await this.repository.findOne({
      where: { code },
    });
  }

  async getReportsByPhoneAndManagerId({
    phone,
    managerId,
    offset,
    limit,
  }: {
    phone: string;
    managerId: string;
    offset: number;
    limit: number;
  }): Promise<SalesReport[]> {
    return await this.repository.find({
      where: { phone, managerId },
      order: { createdAt: 'DESC' },
      skip: offset,
      take: limit,
    });
  }
  async cancelSellByAppointmentId(appointmentId: string): Promise<boolean> {
    await this.repository.findOneAndDelete({ appointmentId });

    return true;
  }

  async getFinishedSalesByMonth({
    date,
    managerId,
  }: {
    date: string;
    managerId: string;
  }): Promise<SalesReport[]> {
    const [year, month] = date.split('-');
    const startOfMonth = `${year}-${month}-01`;
    const endOfMonth = `${year}-${month}-31`;

    return await this.repository
      .aggregate([
        {
          $match: {
            managerId: new ObjectId(managerId),
            date: { $gte: startOfMonth, $lte: endOfMonth },
            status: AppointmentStatus.FINISHED,
          },
        },
      ])
      .toArray();
  }

  async getFinishedSalesFromLast12Months({
    date,
    managerId,
  }: {
    date: Date;
    managerId: string;
  }): Promise<SalesReport[]> {
    const year = getYear(date);
    const month = (getMonth(date) + 1).toString().padStart(2, '0'); // Ensure month is two-digit
    const startOfYear = `${year - 1}-${month}-01`;
    const endOfYear = `${year}-${month}-31`;

    return await this.repository
      .aggregate([
        {
          $match: {
            managerId: new ObjectId(managerId),
            date: { $gte: startOfYear, $lte: endOfYear },
            status: AppointmentStatus.FINISHED,
          },
        },
      ])
      .toArray();
  }

  async getAllFinishedSalesByManagerId(
    managerId: string,
  ): Promise<SalesReport[]> {
    return await this.repository
      .aggregate([
        {
          $match: {
            managerId: new ObjectId(managerId),
            status: AppointmentStatus.FINISHED,
          },
        },
        {
          $sort: {
            date: 1,
          },
        },
      ])
      .toArray();
  }

  async getAllActiveSalesByManagerId(
    managerId: string,
  ): Promise<SalesReport[]> {
    return await this.repository
      .aggregate([
        {
          $match: {
            managerId: new ObjectId(managerId),
            status: AppointmentStatus.ACTIVE,
          },
        },
        {
          $sort: {
            date: 1,
          },
        },
      ])
      .toArray();
  }

  async create(report: CreateOrUpdateSalesReportDto): Promise<boolean> {
    return !!(await this.repository.save(report));
  }

  async update(report: CreateOrUpdateSalesReportDto): Promise<boolean> {
    return !!(await this.repository.findOneAndUpdate(
      {
        managerId: report.managerId,
        time: report.time,
        code: report.code,
      },
      { $set: report },
    ));
  }
}
