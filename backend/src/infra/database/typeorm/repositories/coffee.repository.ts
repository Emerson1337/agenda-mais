import { MongoRepository } from 'typeorm';
import { CoffeeRepository } from '@src/application/use-cases/coffee/repositories/coffee.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CoffeeMDB } from '../entities/coffee.entity';

export class TypeOrmCoffeeRepository implements CoffeeRepository {
  constructor(
    @InjectRepository(CoffeeMDB)
    private readonly coffeeRepository: MongoRepository<CoffeeMDB>,
  ) {}

  async create(coffee: CoffeeMDB): Promise<CoffeeMDB> {
    const createdCoffee = this.coffeeRepository.create(coffee);
    return await this.coffeeRepository.save(createdCoffee);
  }

  async getAll(): Promise<Array<CoffeeMDB>> {
    return await this.coffeeRepository.find();
  }

  async findByName(name: string): Promise<CoffeeMDB> {
    return await this.coffeeRepository.findOne({ where: { name } });
  }
}
