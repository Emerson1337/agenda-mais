import { Injectable } from '@nestjs/common';
import { InvalidParamError, MissingParamError } from '@presentation/errors';
import { CreateProductDto } from '@application/dtos/create-product-dto';
import { Validator } from './validator.interface';

@Injectable()
export class ProductValidator implements Validator {
  validateProductFields(product: CreateProductDto): void {
    if (!product?.name) throw new MissingParamError('name');
    if (!product?.description) throw new MissingParamError('description');
    if (product?.description.length < 4)
      throw new InvalidParamError('description', 'Field too short!');
    if (!product?.picture) throw new MissingParamError('picture');
  }

  validateCoffeeFields(coffee: CreateProductDto): void {
    this.validateProductFields(coffee);
    if (!coffee?.type) throw new MissingParamError('type');
    if (!['ROBUSTA', 'ARABIC'].includes(coffee?.type))
      throw new InvalidParamError(
        'type',
        'values acceptable: ROBUSTA or ARABIC!',
      );
  }
}
