import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '@application/dtos/create-product-dto';
import { TeaRepository } from './repositories/tea.repository';
import { Tea } from '@domain/entities/tea.entity';
import { ProductValidator } from '@domain/validators/product.validator';
import { InvalidParamError } from '@presentation/errors';

@Injectable()
export class TeaService {
  constructor(
    private teaRepository: TeaRepository,
    private productValidator: ProductValidator,
  ) {}

  async create(tea: CreateProductDto): Promise<Tea | Error> {
    this.productValidator.validateProductFields(tea);

    const teaCreated = await this.teaRepository.findByName(tea.name);

    if (teaCreated)
      throw new InvalidParamError('name', 'This name already exists!');

    return await this.teaRepository.create(tea);
  }

  async list(): Promise<Array<Tea> | Error> {
    return await this.teaRepository.getAll();
  }
}
