import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/infra/database/database.module';
import { SchedulesController } from '@src/presentation/http/controllers/schedules.controller';

import { SchedulesService } from './schedules.service';
import { LocaleModule } from '@presentation/locale/locale.module';

@Module({
  imports: [DatabaseModule, LocaleModule],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
