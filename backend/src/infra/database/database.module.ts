import { Module } from '@nestjs/common';

import { TypeormService } from './typeorm/typeorm.service';
import { TypeOrmBookingManagersRepository } from './typeorm/repositories/booking-managers-db.repository';
import { BookingManagersRepository } from '@src/domain/repositories/booking-managers.repository';
import { ResetPasswordTokensRepository } from '@src/domain/repositories/reset-password-tokens.repository';
import { TypeOrmResetPasswordTokensRepository } from './typeorm/repositories/reset-password-tokens-db.repository';

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
  ],
  exports: [
    BookingManagersRepository,
    ResetPasswordTokensRepository,
    TypeormService,
  ],
})
export class DatabaseModule {}
