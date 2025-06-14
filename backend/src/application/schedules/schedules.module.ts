import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { SchedulesController } from '@/presentation/http/controllers/schedules.controller';

import { SchedulesService } from './schedules.service';
import { LocaleModule } from '@presentation/locale/locale.module';
import { SalesReportService } from '@/application/sales-report/sales-report.service';

@Module({
  imports: [DatabaseModule, LocaleModule],
  controllers: [SchedulesController],
  providers: [SchedulesService, SalesReportService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
