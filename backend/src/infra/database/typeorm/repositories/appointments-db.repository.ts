import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';

import { TypeormService } from '../typeorm.service';
import { AppointmentsMDB } from '../entities/appointments-db.entity';
import { AppointmentsRepository } from '@src/domain/repositories/appointments.repository';
import { CreateAppointmentDto } from '@src/application/public-routes/dtos/create-appointment-dto';
import { Appointments } from '@src/domain/entities/appointment.entity';

@Injectable()
export class TypeOrmAppointmentsRepository implements AppointmentsRepository {
  repository: MongoRepository<AppointmentsMDB>;

  constructor(private typeormService: TypeormService) {
    this.repository = typeormService.getMongoRepository(AppointmentsMDB);
  }

  async create(appointment: CreateAppointmentDto): Promise<Appointments> {
    return await this.repository.save(appointment);
  }
}
