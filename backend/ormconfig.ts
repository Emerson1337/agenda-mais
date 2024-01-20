import { join } from 'path';

import 'dotenv/config';

export default {
  type: 'mongodb',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
  debug: true,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: ['src/infra/database/typeorm/migrations/**/*.ts'],
  cli: {
    entitiesDir: [join(__dirname, '/src/infra/database/typeorm/entities')],
    migrationsDir: 'src/infra/database/typeorm/migrations',
  },
};
