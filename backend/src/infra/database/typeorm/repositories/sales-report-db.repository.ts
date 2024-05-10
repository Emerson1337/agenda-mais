import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { TypeormService } from '../typeorm.service';
import { SalesReportRepository } from '@domain/repositories/sales-report.repository';
import { CreateOrUpdateSalesReportDto } from '@application/sales-report/dtos/create-update-sales-report-dto';
import { SalesReportMDB } from '../entities/sales-report-db.entity';
import { SalesReport } from '@domain/entities/sales-report.entity';

@Injectable()
export class TypeOrmSalesReportRepository implements SalesReportRepository {
  repository: MongoRepository<SalesReportMDB>;

  constructor(private typeormService: TypeormService) {
    this.repository = typeormService.getMongoRepository(SalesReportMDB);
  }
  async cancelSellByAppointmentId(appointmentId: string): Promise<boolean> {
    await this.repository.findOneAndDelete({ appointmentId });

    return true;
  }
  async getSalesByMonth({
    date,
    managerId,
  }: {
    date: string;
    managerId: string;
  }): Promise<SalesReport[]> {
    const [year, month] = date.split('-').map(Number);
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    return await this.repository.find({
      where: {
        managerId,
        dateSelected: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
      },
    });
  }

  async getAllSales(managerId: string): Promise<SalesReport[]> {
    return await this.repository.find({ managerId });
  }

  async create(report: CreateOrUpdateSalesReportDto): Promise<boolean> {
    return !!(await this.repository.save(report));
  }

  async update(report: CreateOrUpdateSalesReportDto): Promise<boolean> {
    return !!(await this.repository.findOneAndUpdate(
      {
        managerId: report.managerId,
        time: report.time,
        date: report.date,
        phone: report.phone,
      },
      { $set: report },
    ));
  }
}
