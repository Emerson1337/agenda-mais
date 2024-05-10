import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { ManagerServicesController } from '@/presentation/http/controllers/manager-services.controller';

import { ManagerServicesService } from './manager-services.service';
import { LocaleModule } from '@presentation/locale/locale.module';

@Module({
  imports: [DatabaseModule, LocaleModule],
  controllers: [ManagerServicesController],
  providers: [ManagerServicesService],
  exports: [ManagerServicesService],
})
export class ManagerServicesModule {}
