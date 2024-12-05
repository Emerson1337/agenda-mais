import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BookingManagersMDB } from './entities/booking-managers-db.entity';
import { ManagerServicesMDB } from './entities/manager-service-db.entity';
import { ResetPasswordTokensMDB } from './entities/reset-password-tokens-db.entity';
import { SchedulesMDB } from './entities/schedules-db.entity';

import 'dotenv/config';
import { AppointmentsMDB } from './entities/appointments-db.entity';
import { SalesReportMDB } from './entities/sales-report-db.entity';

@Injectable()
export class TypeormService extends DataSource implements OnModuleInit {
  constructor() {
    super({
      type: 'mongodb',
      url: process.env.DB_URL,
      // host: process.env.DB_HOST,
      // port: Number(process.env.DB_PORT),
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      logging: true,
      entities: [
        BookingManagersMDB,
        ResetPasswordTokensMDB,
        SchedulesMDB,
        ManagerServicesMDB,
        AppointmentsMDB,
        SalesReportMDB,
      ],
    });
  }
  onModuleInit() {
    this.initialize();
  }
}
