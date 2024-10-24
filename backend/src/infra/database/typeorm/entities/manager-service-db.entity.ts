import { ManagerServices } from '@/domain/entities/manager-services.entity';
import { Column, DeleteDateColumn, Entity } from 'typeorm';

import BaseEntityMDB from './config/base.entity';

@Entity('ManagerServices')
export class ManagerServicesMDB
  extends BaseEntityMDB
  implements ManagerServices
{
  @Column({ type: 'string' })
  managerId: string;

  @Column({ type: 'string' })
  name: string;

  @Column({ type: 'number' })
  price: number;

  @Column({ type: 'string' })
  description: string;

  @Column({ type: 'number' })
  timeDurationInMinutes: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
