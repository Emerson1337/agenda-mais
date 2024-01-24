import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BookingManagersMDB } from './entities/booking-managers-db.entity';
import { ResetPasswordTokensMDB } from './entities/reset-password-tokens-db.entity';
import { SchedulesMDB } from './entities/schedules-db.entity';

import 'dotenv/config';

@Injectable()
export class TypeormService extends DataSource implements OnModuleInit {
  constructor() {
    super({
      type: 'mongodb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      logging: true,
      entities: [BookingManagersMDB, ResetPasswordTokensMDB, SchedulesMDB],
    });
  }
  onModuleInit() {
    this.initialize();
  }
}
