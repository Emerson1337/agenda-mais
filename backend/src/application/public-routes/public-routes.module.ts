import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/infra/database/database.module';
import { PublicRoutesController } from '@src/presentation/http/controllers/public-routes.controller';

import { AvailableDatesService } from './available-dates.service';
import { AppointmentsService } from './appointments.service';
import { LocaleModule } from '@presentation/locale/locale.module';
import { SalesReportService } from '../sales-report/sales-report.service';

@Module({
  imports: [DatabaseModule, LocaleModule],
  controllers: [PublicRoutesController],
  providers: [AvailableDatesService, AppointmentsService, SalesReportService],
  exports: [AvailableDatesService, AppointmentsService],
})
export class PublicRoutesModule {}
