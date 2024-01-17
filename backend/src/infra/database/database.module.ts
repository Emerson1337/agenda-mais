import { Module } from '@nestjs/common';
import { CoffeeRepository } from 'src/application/use-cases/coffee/repositories/coffee.repository';
import { TypeOrmCoffeeRepository } from './typeorm/repositories/coffee.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from '@domain/entities/coffee.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Tea } from '@domain/entities/tea.entity';
import { TeaRepository } from '@application/use-cases/tea/repositories/tea.repository';
import { TypeOrmTeaRepository } from './typeorm/repositories/tea.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/../../**/*.entity{.js,.ts}'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Coffee, Tea]),
  ],
  providers: [
    {
      provide: CoffeeRepository,
      useClass: TypeOrmCoffeeRepository,
    },
    {
      provide: TeaRepository,
      useClass: TypeOrmTeaRepository,
    },
  ],
  exports: [CoffeeRepository, TeaRepository],
})
export class DatabaseModule {}
