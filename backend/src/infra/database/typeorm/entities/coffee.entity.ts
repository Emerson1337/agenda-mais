import { Column, Entity } from 'typeorm';

import BaseEntityMDB from './config/base.entity';

@Entity('Coffees')
export class CoffeeMDB extends BaseEntityMDB {
  @Column({ unique: true })
  name: string;

  @Column()
  type: string;

  @Column()
  description: string;
}
