import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from '@src/application/schedules/dtos/create-schedule.dto';
import { Schedules } from '@src/domain/entities/schedules.entity copy';
import { SchedulesRepository } from '@src/domain/repositories/schedules.repository';
import { MongoRepository } from 'typeorm';

import { SchedulesMDB } from '../entities/schedules-db.entity';
import { TypeormService } from '../typeorm.service';

@Injectable()
export class TypeOrmSchedulesRepository implements SchedulesRepository {
  repository: MongoRepository<SchedulesMDB>;

  constructor(private typeormService: TypeormService) {
    this.repository = typeormService.getMongoRepository(SchedulesMDB);
  }
  async getAllByDate(managerId: string, date: string): Promise<Schedules[]> {
    const query: { managerId: string; date?: string } = {
      managerId,
    };

    if (date) {
      query.date = date;
    }

    return await this.repository.find({
      where: query,
    });
  }

  async createOrUpdate(
    managerId: string,
    scheduleData: CreateScheduleDto,
  ): Promise<Schedules> {
    const existingSchedule = await this.repository.findOne({
      where: {
        managerId,
        date: scheduleData.date,
      },
    });

    if (existingSchedule) {
      scheduleData = Object.assign(existingSchedule, scheduleData);
    }

    return await this.repository.save(scheduleData);
  }

  async getAll(managerId: string): Promise<Schedules[]> {
    return await this.repository.find({
      where: {
        managerId,
      },
    });
  }
}
