import { Column, Entity } from 'typeorm';
import { Coffee } from '@src/domain/entities/coffee.entity';
import BaseEntityMDB from './config/base.entity';

@Entity('coffees')
export class CoffeeMDB extends BaseEntityMDB implements Coffee {
  @Column({ unique: true })
  name: string;

  @Column()
  picture: string;

  @Column()
  type: string;

  @Column()
  description: string;
}
