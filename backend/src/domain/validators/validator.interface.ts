import { CreateProductDto } from '@application/dtos/create-product-dto';

export interface Validator {
  validateProductFields(product: CreateProductDto): void;
}
