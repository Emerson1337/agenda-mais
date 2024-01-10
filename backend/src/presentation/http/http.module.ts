import { Module } from '@nestjs/common';
import { CoffeeController } from './controllers/coffee/coffee.controller';
import { CoffeeService } from '@application/use-cases/coffee/coffee.service';
import { DatabaseModule } from '@infra/database/database.module';
import { ValidatorsModule } from '@domain/validators/validator.module';
import { TeaService } from '@application/use-cases/tea/tea.service';
import { TeaController } from './controllers/tea/tea.controller';

@Module({
  imports: [DatabaseModule, ValidatorsModule],
  controllers: [CoffeeController, TeaController],
  providers: [CoffeeService, TeaService],
})
export class HttpModule {}
