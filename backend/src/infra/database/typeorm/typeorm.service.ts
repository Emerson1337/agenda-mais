import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { CoffeeMDB } from './entities/coffee.entity';

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
      entities: [CoffeeMDB],
    });
  }
  onModuleInit() {
    this.initialize();
  }
}
