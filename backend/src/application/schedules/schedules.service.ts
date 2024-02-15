import { Injectable } from '@nestjs/common';
import { Schedules } from '@src/domain/entities/schedules.entity';
import { AppointmentsRepository } from '@src/domain/repositories/appointments.repository';
import { SchedulesRepository } from '@src/domain/repositories/schedules.repository';
import { InvalidParamError } from '@src/presentation/errors';

import { CreateScheduleDto, SchedulesTime } from './dtos/create-schedule.dto';
import { DeleteScheduleDto } from './dtos/delete-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    private schedulesRepository: SchedulesRepository,
    private appointmentsRepository: AppointmentsRepository,
  ) {}

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

  async list({
    managerId,
  }: {
    managerId: string;
  }): Promise<Schedules[] | Error> {
    return await this.schedulesRepository.getAll(managerId);
  }

  async listAppointments({
    managerId,
  }: {
    managerId: string;
  }): Promise<Schedules[] | Error> {
    const schedules =
      await this.schedulesRepository.getAllNotAvailable(managerId);

    return await Promise.all(
      schedules.map(async (schedule) => ({
        ...schedule,
        times: schedule.times.filter(this.filterTimesNotAvailable),
        appointment: await this.appointmentsRepository.getByScheduleId(
          schedule.id,
        ),
      })),
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

  private filterTimesNotAvailable(time: SchedulesTime): boolean {
    return time.available == false;
  }

  async delete({
    schedulesIds,
    userId,
  }: DeleteScheduleDto): Promise<{ message: string }> {
    await this.schedulesRepository.deleteSchedules({
      schedulesIds,
      userId,
    });

    return { message: 'Schedules deleted successfully!' };
  }
}
