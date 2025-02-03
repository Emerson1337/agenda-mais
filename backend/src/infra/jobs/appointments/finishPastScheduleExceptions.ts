import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SchedulesRepository } from '@/domain/repositories/schedules.repository';
import { toZonedTime } from 'date-fns-tz';

@Injectable()
export class FinishPastScheduleExceptionsService {
  private readonly logger = new Logger(
    FinishPastScheduleExceptionsService.name,
  );
  constructor(private readonly schedulesRepository: SchedulesRepository) {}

  @Cron(CronExpression.EVERY_DAY_AT_11PM, {
    name: 'FinishPastScheduleExceptionsService',
    timeZone: 'America/Fortaleza',
  })
  async handleCron() {
    this.logger.debug('🔄 Running FinishPastScheduleExceptionsService...');

    const now = new Date();
    const timeZone = 'America/Fortaleza';
    const today = toZonedTime(now, timeZone);

    const schedules = await this.schedulesRepository.getAll();

    for (const schedule of schedules) {
      schedule.dateExceptions = schedule.dateExceptions.filter((exception) => {
        const exceptionDate = new Date(exception.date).getTime();
        return exceptionDate >= today.getTime();
      });

      await this.schedulesRepository.createOrUpdate(
        schedule.managerId,
        schedule,
      );
    }

    this.logger.debug('✅ FinishPastScheduleExceptionsService concluded!');
  }
}
