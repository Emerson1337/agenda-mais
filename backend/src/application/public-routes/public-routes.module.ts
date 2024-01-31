import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/infra/database/database.module';
import { PublicRoutesController } from '@src/presentation/http/controllers/public-routes.controller';

import { AvailableDatesService } from './available-dates.service';
import { AppointmentsService } from './appointments.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PublicRoutesController],
  providers: [AvailableDatesService, AppointmentsService],
  exports: [AvailableDatesService, AppointmentsService],
})
export class PublicRoutesModule {}
