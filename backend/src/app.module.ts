import { Module } from '@nestjs/common';

import { AuthModule } from '@/application/auth/auth.module';
import { BookingManagersModule } from '@/application/booking-managers/booking-managers.module';
import { ManagerServicesModule } from '@/application/manager-services/manager-services.module';
import { PublicRoutesModule } from '@/application/public-routes/public-routes.module';
import { SchedulesModule } from '@/application/schedules/schedules.module';
import { LocaleModule } from '@/presentation/locale/locale.module';
import { SalesReportModule } from '@/application/sales-report/sales-report.module';
import { ScheduleModule } from '@nestjs/schedule';
import { JobsModule } from '@/infra/jobs/jobs.module';

@Module({
  imports: [
    BookingManagersModule,
    AuthModule,
    SchedulesModule,
    PublicRoutesModule,
    ManagerServicesModule,
    LocaleModule,
    SalesReportModule,
    ScheduleModule.forRoot(),
    JobsModule,
  ],
})
export class AppModule {}
