import { Module } from '@nestjs/common';

import { AuthModule } from './application/auth/auth.module';
import { BookingManagersModule } from './application/booking-managers/booking-managers.module';
import { PublicRoutesModule } from './application/public-routes/public-routes.module';
import { SchedulesModule } from './application/schedules/schedules.module';

@Module({
  imports: [
    BookingManagersModule,
    AuthModule,
    SchedulesModule,
    PublicRoutesModule,
  ],
})
export class AppModule {}
