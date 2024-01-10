module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST_TYPEORM,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity{.js,.ts}'],
  migrations: ['src/infra/database/typeorm/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/infra/database/typeorm/migrations',
  },
};
