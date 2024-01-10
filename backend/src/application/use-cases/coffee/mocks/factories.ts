import { Coffee } from '@domain/entities/coffee.entity';

export const makeFakeCoffee = (): Coffee => ({
  id: 'valid_id',
  name: 'valid_name',
  description: 'valid_description',
  picture: 'valid_picture',
  type: 'ROBUSTA',
  created_at: new Date('2023-06-03T03:43:54.555Z'),
  updated_at: new Date('2023-06-03T03:43:54.555Z'),
});
