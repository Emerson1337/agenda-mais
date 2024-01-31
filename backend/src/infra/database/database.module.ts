import { Module } from '@nestjs/common';
import { BookingManagersRepository } from '@src/domain/repositories/booking-managers.repository';
import { ManagerServicesRepository } from '@src/domain/repositories/manager-services.repository';
import { ResetPasswordTokensRepository } from '@src/domain/repositories/reset-password-tokens.repository';
import { SchedulesRepository } from '@src/domain/repositories/schedules.repository';

import { TypeOrmBookingManagersRepository } from './typeorm/repositories/booking-managers-db.repository';
import { TypeOrmManagerServicesRepository } from './typeorm/repositories/manager-services-db.repository';
import { TypeOrmResetPasswordTokensRepository } from './typeorm/repositories/reset-password-tokens-db.repository';
import { TypeOrmSchedulesRepository } from './typeorm/repositories/schedules-db.repository';
import { TypeormService } from './typeorm/typeorm.service';
import { AppointmentsRepository } from '@src/domain/repositories/appointments.repository';
import { TypeOrmAppointmentsRepository } from './typeorm/repositories/appointments-db.repository';

@Module({
  providers: [
    TypeormService,
    {
      provide: BookingManagersRepository,
      useClass: TypeOrmBookingManagersRepository,
    },
    {
      provide: ResetPasswordTokensRepository,
      useClass: TypeOrmResetPasswordTokensRepository,
    },
    {
      provide: SchedulesRepository,
      useClass: TypeOrmSchedulesRepository,
    },
    {
      provide: ManagerServicesRepository,
      useClass: TypeOrmManagerServicesRepository,
    },
    {
      provide: AppointmentsRepository,
      useClass: TypeOrmAppointmentsRepository,
    },
  ],
  exports: [
    BookingManagersRepository,
    SchedulesRepository,
    ResetPasswordTokensRepository,
    ManagerServicesRepository,
    AppointmentsRepository,
    TypeormService,
  ],
})
export class DatabaseModule {}
