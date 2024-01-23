import { Injectable } from '@nestjs/common';
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

  async create(scheduleData: Schedules): Promise<Schedules> {
    return await this.repository.save(scheduleData);
  }
}
