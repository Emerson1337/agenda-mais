import { Module } from '@nestjs/common';
import { ValidatorsModule } from '@domain/validators/validator.module';
import { CoffeeService } from '@src/application/use-cases/coffee/coffee.service';
import { CoffeeController } from './controllers/coffee.controller';
import { DatabaseModule } from '@src/infra/database/database.module';

@Module({
  imports: [DatabaseModule, ValidatorsModule],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class HttpModule {}
