import { Column, Entity } from 'typeorm';
import BaseEntity from './config/base.entity';

@Entity('teas')
export class Tea extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  picture: string;

  @Column()
  description: string;
}
