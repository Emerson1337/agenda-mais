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
}
