import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRepository } from '@src/application/use-cases/coffee/repositories/coffee.repository';

import ormconfig from '../../../ormconfig';
import { CoffeeMDB } from './typeorm/entities/coffee.entity';
import { TypeOrmCoffeeRepository } from './typeorm/repositories/coffee.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...ormconfig, type: 'mongodb' }),
    TypeOrmModule.forFeature([CoffeeMDB]),
  ],
  providers: [
    {
      provide: CoffeeRepository,
      useClass: TypeOrmCoffeeRepository,
    },
  ],
  exports: [CoffeeRepository],
})
export class DatabaseModule {}
