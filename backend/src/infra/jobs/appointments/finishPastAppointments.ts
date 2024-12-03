import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppointmentsRepository } from '@/domain/repositories/appointments.repository';
import { format } from 'date-fns';
import { SalesReportRepository } from '@/domain/repositories/sales-report.repository';

@Injectable()
export class FinishPastAppointmentsService {
  private readonly logger = new Logger(FinishPastAppointmentsService.name);
  constructor(
    private readonly appointmentRepository: AppointmentsRepository,
    private readonly salesReportRepository: SalesReportRepository,
  ) {}

  @Cron(CronExpression.EVERY_SECOND, {
    name: 'FinishPastAppointmentsService',
    timeZone: 'America/Fortaleza',
  })
  async handleCron() {
    this.logger.debug('🔄 Running FinishPastAppointmentsService...');

    const now = new Date();
    const time = format(now, 'HH:mm');
    const date = format(now, 'yyyy-MM-dd');

    const pastAppointments =
      await this.appointmentRepository.findPastAppointments({
        time,
        date,
      });

    for (const appointment of pastAppointments) {
      await this.appointmentRepository.deleteByAppointmentCode(
        appointment.code,
      );
      await this.salesReportRepository.setFinishedStatusByCode(
        appointment.code,
      );
    }

    this.logger.debug('✅ FinishPastAppointmentsService concluded!');
  }
}
