import { Coffee } from '@domain/entities/coffee.entity';
import { CreateProductDto } from '@application/dtos/create-product-dto';

export abstract class CoffeeRepository {
  abstract create(coffee: CreateProductDto): Promise<Coffee>;
  abstract getAll(): Promise<Array<Coffee>>;
  abstract findByName(name: string): Promise<Coffee>;
}
