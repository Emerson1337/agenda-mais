import { Module } from '@nestjs/common';
import { CoffeeRepository } from '@src/application/use-cases/coffee/repositories/coffee.repository';

import { PrismaService } from './prisma/prisma.service';
import { PrismaCoffeeRepository } from './prisma/repositories/coffee.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CoffeeRepository,
      useClass: PrismaCoffeeRepository,
    },
  ],
  exports: [CoffeeRepository, PrismaService],
})
export class DatabaseModule {}
