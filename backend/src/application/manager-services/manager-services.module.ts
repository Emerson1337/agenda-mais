import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/infra/database/database.module';
import { ManagerServicesController } from '@src/presentation/http/controllers/manager-services.controller';

import { ManagerServicesService } from './manager-services.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ManagerServicesController],
  providers: [ManagerServicesService],
  exports: [ManagerServicesService],
})
export class ManagerServicesModule {}
