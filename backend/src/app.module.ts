import { Module } from '@nestjs/common';

import { AuthModule } from './application/auth/auth.module';
import { BookingManagersModule } from './application/booking-managers/booking-managers.module';
import { ManagerServicesModule } from './application/manager-services/manager-services.module';
import { PublicRoutesModule } from './application/public-routes/public-routes.module';
import { SchedulesModule } from './application/schedules/schedules.module';
import { LocaleModule } from './presentation/locale/locale.module';

@Module({
  imports: [
    BookingManagersModule,
    AuthModule,
    SchedulesModule,
    PublicRoutesModule,
    ManagerServicesModule,
    LocaleModule,
  ],
})
export class AppModule {}
