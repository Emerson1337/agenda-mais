import { Module } from '@nestjs/common';
import { ProductValidator } from './product.validator';

@Module({
  providers: [ProductValidator],
  exports: [ProductValidator],
})
export class ValidatorsModule {}
