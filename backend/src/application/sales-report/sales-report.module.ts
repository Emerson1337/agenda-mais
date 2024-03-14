import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/infra/database/database.module';
import { LocaleModule } from '@presentation/locale/locale.module';
import { SalesReportController } from '@presentation/http/controllers/sales-report.controller';
import { SalesReportService } from './sales-report.service';

@Module({
  imports: [DatabaseModule, LocaleModule],
  controllers: [SalesReportController],
  providers: [SalesReportService],
})
export class SalesReportModule {}
