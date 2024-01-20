import { Module } from '@nestjs/common';
import { BookingManagersService } from './booking-managers.service';
import { BookingManagerController } from '@src/presentation/http/controllers/booking-manager.controller';
import { DatabaseModule } from '@src/infra/database/database.module';
import { EncryptAdapter } from '@src/infra/adapters/encrypt.adapter';

@Module({
  imports: [DatabaseModule],
  controllers: [BookingManagerController],
  providers: [BookingManagersService, EncryptAdapter],
  exports: [BookingManagersService],
})
export class BookingManagersModule {}
