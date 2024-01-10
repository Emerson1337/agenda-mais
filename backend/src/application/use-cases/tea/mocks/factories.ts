import { Tea } from '@domain/entities/tea.entity';

export const makeFakeTea = (): Tea => ({
  id: 'valid_id',
  name: 'valid_name',
  description: 'valid_description',
  picture: 'valid_picture',
  created_at: new Date('2023-06-03T03:43:54.555Z'),
  updated_at: new Date('2023-06-03T03:43:54.555Z'),
});
