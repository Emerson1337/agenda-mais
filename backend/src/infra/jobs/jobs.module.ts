import { Module } from '@nestjs/common';
import { FinishPastAppointmentsService } from './appointments/finishPastAppointments';
import { FinishPastScheduleExceptionsService } from './appointments/finishPastScheduleExceptions';
import { DatabaseModule } from '@/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    FinishPastAppointmentsService,
    FinishPastScheduleExceptionsService,
  ],
  exports: [FinishPastAppointmentsService, FinishPastScheduleExceptionsService],
})
export class JobsModule {}
