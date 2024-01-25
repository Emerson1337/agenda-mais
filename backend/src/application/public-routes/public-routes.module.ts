import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/infra/database/database.module';
import { PublicRoutesController } from '@src/presentation/http/controllers/public-routes.controller';

import { AvailableDatesService } from './available-dates.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PublicRoutesController],
  providers: [AvailableDatesService],
  exports: [AvailableDatesService],
})
export class PublicRoutesModule {}
