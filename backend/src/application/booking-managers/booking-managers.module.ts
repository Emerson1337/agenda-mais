import { Module } from '@nestjs/common';
import { EncryptAdapter } from '@src/infra/adapters/encrypt.adapter';
import { DatabaseModule } from '@src/infra/database/database.module';
import { BookingManagerAdminController } from '@src/presentation/http/controllers/booking-manager-admin.controller';
import { BookingManagerController } from '@src/presentation/http/controllers/booking-manager.controller';

import { BookingManagersService } from './booking-managers.service';
import { FileAdapter } from '@src/infra/adapters/file.adapter';

@Module({
  imports: [DatabaseModule],
  controllers: [BookingManagerController, BookingManagerAdminController],
  providers: [BookingManagersService, EncryptAdapter, FileAdapter],
  exports: [BookingManagersService],
})
export class BookingManagersModule {}
