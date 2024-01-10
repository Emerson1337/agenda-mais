import { Coffee } from '@domain/entities/coffee.entity';
import { CreateProductDto } from '@application/dtos/create-product-dto';
import { CoffeeRepository } from '../repositories/coffee.repository';
import { makeFakeCoffee } from './factories';

export class CoffeeRepositoryStub implements CoffeeRepository {
  coffee: CreateProductDto;

  async create(coffee: CreateProductDto): Promise<Coffee> {
    this.coffee = coffee;
    const fakeCoffee = makeFakeCoffee();

    return new Promise((resolve) => resolve(fakeCoffee));
  }

  async getAll(): Promise<Array<Coffee>> {
    const fakeCoffee = makeFakeCoffee();

    return new Promise((resolve) => resolve([fakeCoffee, fakeCoffee]));
  }

  async findByName(name: string): Promise<Coffee> {
    name;

    return new Promise((resolve) => resolve(null));
  }
}
