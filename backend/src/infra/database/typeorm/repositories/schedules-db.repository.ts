import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from '@src/application/schedules/dtos/create-schedule.dto';
import { Schedules } from '@src/domain/entities/schedules.entity';
import { SchedulesRepository } from '@src/domain/repositories/schedules.repository';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';

import { SchedulesMDB } from '../entities/schedules-db.entity';
import { TypeormService } from '../typeorm.service';

@Injectable()
export class TypeOrmSchedulesRepository implements SchedulesRepository {
  repository: MongoRepository<SchedulesMDB>;

  constructor(private typeormService: TypeormService) {
    this.repository = typeormService.getMongoRepository(SchedulesMDB);
  }
  async makeScheduleAvailableByIdAndTime({
    id,
    managerId,
    time,
  }: {
    id: string;
    managerId: string;
    time: string;
  }): Promise<Schedules> {
    return (await this.repository.findOneAndUpdate(
      { _id: new ObjectId(id), 'times.time': time, managerId },
      { $set: { 'times.$.available': true } },
      { returnDocument: 'after' },
    )) as Schedules;
  }

  async deleteSchedules({
    schedulesIds,
    userId,
  }: {
    schedulesIds: string[];
    userId: string;
  }): Promise<void> {
    await this.repository.deleteMany({
      _id: {
        $in: schedulesIds.map((scheduleId) => new ObjectId(scheduleId)),
      },
      managerId: userId,
    });
  }

  async updateTimeAvailabilityByIdAndTime({
    id,
    time,
    managerId,
  }: {
    id: string;
    time: string;
    managerId: string;
  }): Promise<Schedules> {
    return (await this.repository.findOneAndUpdate(
      { _id: new ObjectId(id), 'times.time': time, managerId },
      { $set: { 'times.$.available': false } },
      { returnDocument: 'after' },
    )) as Schedules;
  }

  async findByIdAndTimeAvailable({
    id,
    time,
    managerId,
  }: {
    id: string;
    time: string;
    managerId: string;
  }): Promise<Schedules> {
    return await this.repository.findOne({
      where: {
        _id: new ObjectId(id),
        times: {
          $elemMatch: {
            time: time,
            available: true,
          },
        },
        managerId,
      },
    });
  }

  async getAllNotAvailable(managerId: string): Promise<Schedules[]> {
    return await this.repository.find({
      where: {
        managerId,
        'times.available': false,
      },
    });
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
