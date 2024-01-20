import { Injectable } from '@nestjs/common';
import { CoffeeRepository } from '@src/application/use-cases/coffee/repositories/coffee.repository';
import { MongoRepository } from 'typeorm';

import { CoffeeMDB } from '../entities/coffee.entity';
import { TypeormService } from '../typeorm.service';

@Injectable()
export class TypeOrmCoffeeRepository implements CoffeeRepository {
  repository: MongoRepository<CoffeeMDB>;

  constructor(private typeormService: TypeormService) {
    this.repository = typeormService.getMongoRepository(CoffeeMDB);
  }

  async create(coffee: CoffeeMDB): Promise<CoffeeMDB> {
    return await this.repository.save(coffee);
  }

  async getAll(): Promise<Array<CoffeeMDB>> {
    return await this.repository.find({});
  }

  async findByName(name: string): Promise<CoffeeMDB> {
    return this.repository.findOne({
      where: { name },
    });
  }
}
