import { Module } from '@nestjs/common';

import { TypeormService } from './typeorm/typeorm.service';
import { TypeOrmBookingManagersRepository } from './typeorm/repositories/booking-managers-db.repository';
import { BookingManagersRepository } from '@src/domain/repositories/booking-managers.repository';

@Module({
  providers: [
    TypeormService,
    {
      provide: BookingManagersRepository,
      useClass: TypeOrmBookingManagersRepository,
    },
  ],
  exports: [BookingManagersRepository, TypeormService],
})
export class DatabaseModule {}
