import { Coffee } from '@src/domain/entities/coffee.entity';
import { Column, Entity } from 'typeorm';

import BaseEntityMDB from './config/base.entity';

@Entity('coffees')
export class CoffeeMDB extends BaseEntityMDB implements Coffee {
  @Column({ unique: true })
  name: string;

  @Column()
  type: string;

  @Column()
  description: string;
}
