import { Tea } from '@domain/entities/tea.entity';
import { CreateProductDto } from '@application/dtos/create-product-dto';

export abstract class TeaRepository {
  abstract create(coffee: CreateProductDto): Promise<Tea>;
  abstract getAll(): Promise<Array<Tea>>;
  abstract findByName(name: string): Promise<Tea>;
}
