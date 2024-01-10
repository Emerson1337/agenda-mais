import { Column, Entity } from 'typeorm';
import BaseEntity from './config/base.entity';

@Entity('coffees')
export class Coffee extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  picture: string;

  @Column()
  type: string;

  @Column()
  description: string;
}
