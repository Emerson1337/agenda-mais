import BaseEntity from './config/base.entity';

export class Coffee extends BaseEntity {
  name: string;
  type: string;
  description: string;
}
