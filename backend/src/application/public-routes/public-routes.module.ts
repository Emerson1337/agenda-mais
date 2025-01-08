import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { PublicRoutesController } from '@/presentation/http/controllers/public-routes.controller';

import { DatesService } from './dates.service';
import { AppointmentsService } from './appointments.service';
import { LocaleModule } from '@presentation/locale/locale.module';
import { SalesReportService } from '@/application/sales-report/sales-report.service';
import { SchedulesService } from '@/application/schedules/schedules.service';
import { InfraController } from '@/presentation/http/controllers/infra.controller';

@Module({
  imports: [DatabaseModule, LocaleModule],
  controllers: [PublicRoutesController, InfraController],
  providers: [
    DatesService,
    AppointmentsService,
    SalesReportService,
    SchedulesService,
  ],
  exports: [DatesService, AppointmentsService],
})
export class PublicRoutesModule {}
