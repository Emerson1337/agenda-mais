import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/infra/database/database.module';
import { BookingManagerController } from './controllers/booking-manager.controller';
import { BookingManagersService } from '@src/application/booking-managers/booking-managers.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BookingManagerController],
  providers: [BookingManagersService],
})
export class HttpModule {}
