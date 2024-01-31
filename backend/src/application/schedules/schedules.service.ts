import { Injectable } from '@nestjs/common';
import { Schedules } from '@src/domain/entities/schedules.entity';
import { SchedulesRepository } from '@src/domain/repositories/schedules.repository';
import { InvalidParamError } from '@src/presentation/errors';

import { CreateScheduleDto, SchedulesTime } from './dtos/create-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(private schedulesRepository: SchedulesRepository) {}

  async createOrUpdate(
    schedule: CreateScheduleDto,
  ): Promise<Schedules | Error> {
    if (this.hasTimeDuplicated(schedule.times))
      throw new InvalidParamError('Times', 'Duplicated times not allowed');

    return await this.schedulesRepository.createOrUpdate(
      schedule.managerId,
      schedule,
    );
  }

  async list(managerId: string): Promise<Schedules[] | Error> {
    return await this.schedulesRepository.getAll(managerId);
  }

  async listAppointments(managerId: string): Promise<Schedules[] | Error> {
    const schedules =
      await this.schedulesRepository.getAllNotAvailable(managerId);

    return schedules.map((schedule) => ({
      ...schedule,
      times: schedule.times.filter(this.filterTimesNotAvailable),
      // appointment: data,
      //add appointmentId filter
    }));
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

  private filterTimesNotAvailable(time: SchedulesTime): boolean {
    return time.available == false;
  }
}
