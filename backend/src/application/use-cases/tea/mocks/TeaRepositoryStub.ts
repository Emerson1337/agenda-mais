import { Tea } from '@domain/entities/tea.entity';
import { CreateProductDto } from '@application/dtos/create-product-dto';
import { TeaRepository } from '../repositories/tea.repository';
import { makeFakeTea } from './factories';

export class TeaRepositoryStub implements TeaRepository {
  tea: CreateProductDto;

  async create(tea: CreateProductDto): Promise<Tea> {
    this.tea = tea;
    const fakeTea = makeFakeTea();

    return new Promise((resolve) => resolve(fakeTea));
  }

  async getAll(): Promise<Array<Tea>> {
    const fakeTea = makeFakeTea();

    return new Promise((resolve) => resolve([fakeTea, fakeTea]));
  }

  async findByName(name: string): Promise<Tea> {
    name;
    return new Promise((resolve) => resolve(null));
  }
}
