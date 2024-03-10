import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from '@src/application/public-routes/dtos/create-appointment-dto';
import { Appointments } from '@src/domain/entities/appointment.entity';
import { AppointmentsRepository } from '@src/domain/repositories/appointments.repository';
import { MongoRepository } from 'typeorm';

import { AppointmentsMDB } from '../entities/appointments-db.entity';
import { TypeormService } from '../typeorm.service';

@Injectable()
export class TypeOrmAppointmentsRepository implements AppointmentsRepository {
  repository: MongoRepository<AppointmentsMDB>;

  constructor(private typeormService: TypeormService) {
    this.repository = typeormService.getMongoRepository(AppointmentsMDB);
  }

  async getByScheduleId(scheduleId: string): Promise<Appointments> {
    return await this.repository.findOneBy({ scheduleId });
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
