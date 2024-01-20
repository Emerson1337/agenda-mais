import { Module } from '@nestjs/common';
import { CoffeeRepository } from '@src/application/use-cases/coffee/repositories/coffee.repository';

import { TypeOrmCoffeeRepository } from './typeorm/repositories/coffee.repository';
import { TypeormService } from './typeorm/typeorm.service';

@Module({
  providers: [
    TypeormService,
    {
      provide: CoffeeRepository,
      useClass: TypeOrmCoffeeRepository,
    },
  ],
  exports: [CoffeeRepository, TypeormService],
})
export class DatabaseModule {}
