import { Module } from '@nestjs/common';
import { EncryptAdapter } from '@/infra/adapters/encrypt.adapter';
import { DatabaseModule } from '@/infra/database/database.module';
import { BookingManagerAdminController } from '@/presentation/http/controllers/booking-manager-admin.controller';
import { BookingManagerController } from '@/presentation/http/controllers/booking-manager.controller';

import { BookingManagersService } from './booking-managers.service';
import { FileAdapter } from '@/infra/adapters/file.adapter';
import { LocaleModule } from '@presentation/locale/locale.module';

@Module({
  imports: [DatabaseModule, LocaleModule],
  controllers: [BookingManagerController, BookingManagerAdminController],
  providers: [BookingManagersService, EncryptAdapter, FileAdapter],
  exports: [BookingManagersService],
})
export class BookingManagersModule {}
