import { Module } from '@nestjs/common';
import { FinishPastAppointmentsService } from './appointments/finishPastAppointments';
import { DatabaseModule } from '@/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [FinishPastAppointmentsService],
  exports: [FinishPastAppointmentsService],
})
export class JobsModule {}
