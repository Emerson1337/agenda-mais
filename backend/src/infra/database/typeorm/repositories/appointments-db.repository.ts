import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from '@/application/public-routes/dtos/create-appointment-dto';
import { Appointments } from '@/domain/entities/appointment.entity';
import { AppointmentsRepository } from '@/domain/repositories/appointments.repository';
import { MongoRepository } from 'typeorm';

import { AppointmentsMDB } from '@/infra/database/typeorm/entities/appointments-db.entity';
import { TypeormService } from '@/infra/database/typeorm/typeorm.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class TypeOrmAppointmentsRepository implements AppointmentsRepository {
  repository: MongoRepository<AppointmentsMDB>;

  constructor(private typeormService: TypeormService) {
    this.repository = typeormService.getMongoRepository(AppointmentsMDB);
  }

  async findPastAppointments({
    time,
    date,
  }: {
    time: string;
    date: string;
  }): Promise<Appointments[]> {
    const pastAppointments = await this.repository.find({
      where: {
        $or: [{ date: { $lt: date } }, { date, time: { $lt: time } }],
      },
    });

    return pastAppointments;
  }

  async deleteById({
    id,
    managerId,
  }: {
    id: string;
    managerId: string;
  }): Promise<Appointments | null> {
    return (await this.repository.findOneAndDelete({
      _id: new ObjectId(id),
      managerId: new ObjectId(managerId),
    })) as Appointments;
  }

  async findByTimeAndDateAndManagerId({
    time,
    date,
    managerId,
  }: {
    time: string;
    date: string;
    managerId: string;
  }): Promise<Appointments> {
    return await this.repository.findOneBy({
      time,
      date,
      managerId,
    });
  }

  async getByManagerId(managerId: string): Promise<Appointments[]> {
    return await this.repository
      .aggregate([
        {
          $match: { managerId },
        },
        {
          $lookup: {
            from: 'ManagerServices',
            localField: 'serviceId',
            foreignField: '_id',
            as: 'service',
          },
        },
        {
          $unwind: '$service',
        },
      ])
      .toArray();
  }

  async getByScheduleId({
    scheduleId,
    managerId,
  }: {
    scheduleId: string;
    managerId: string;
  }): Promise<Appointments> {
    return await this.repository.findOneBy({
      scheduleId,
      managerId,
    });
  }

  async findActiveByAppointmentCode({
    code,
    managerId,
    phone,
  }: {
    code: string;
    managerId: string;
    phone: string;
  }): Promise<Appointments | null> {
    return (await this.repository.findOne({
      where: {
        code,
        phone,
        managerId,
      },
    })) as Appointments;
  }

  async deleteByAppointmentCode(
    appointmentCode: string,
  ): Promise<Appointments | null> {
    return (await this.repository.findOneAndDelete({
      code: appointmentCode,
    })) as Appointments;
  }

  async create(appointment: CreateAppointmentDto): Promise<Appointments> {
    return await this.repository.save(appointment);
  }
}
