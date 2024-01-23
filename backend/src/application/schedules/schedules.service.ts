import { Injectable } from '@nestjs/common';
import { Schedules } from '@src/domain/entities/schedules.entity copy';
import { SchedulesRepository } from '@src/domain/repositories/schedules.repository';
import { InvalidParamError } from '@src/presentation/errors';

import { CreateScheduleDto, SchedulesTime } from './dtos/create-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(private schedulesRepository: SchedulesRepository) {}

  async create(schedule: CreateScheduleDto): Promise<Schedules | Error> {
    if (this.hasTimeDuplicated(schedule.times))
      throw new InvalidParamError('Times', 'Duplicated times not allowed');

    return await this.schedulesRepository.createOrUpdate(
      schedule.managerId,
      schedule,
    );
  }

  private hasTimeDuplicated(times: SchedulesTime[]) {
    const valueArr = times.map(function (item: SchedulesTime) {
      return item.time;
    });
    const isDuplicate = valueArr.some(
      (item: string, idx: number) => valueArr.indexOf(item) != idx,
    );

    return isDuplicate;
  }
}
