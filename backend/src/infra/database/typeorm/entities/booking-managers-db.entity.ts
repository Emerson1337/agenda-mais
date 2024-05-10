import { BookingManagers } from '@/domain/entities/booking-managers.entity';
import { ManagersPlansEnum } from '@/domain/entities/enums/managers-plans.enum';
import { ManagersRolesEnum } from '@/domain/entities/enums/managers-roles.enum';
import { ManagerStatus } from '@/domain/entities/enums/managers-status.enum';
import { Column, Entity } from 'typeorm';

import BaseEntityMDB from './config/base.entity';

@Entity('BookingManagers')
export class BookingManagersMDB
  extends BaseEntityMDB
  implements BookingManagers
{
  @Column({ nullable: true, type: 'text' })
  welcomeMessage?: string;

  @Column({ type: 'string' })
  username: string;

  @Column({ type: 'string' })
  firstName: string;

  @Column({ nullable: true, type: 'string' })
  lastName?: string;

  @Column({ type: 'string', unique: true })
  email: string;

  @Column({ type: 'string', unique: true })
  phone: string;

  @Column({ type: 'string', nullable: true })
  profilePhoto?: string;

  @Column({ type: 'int', nullable: true })
  appointmentsPerPhone?: number;

  @Column({ type: 'string', nullable: true })
  googleId?: string;

  @Column({ type: 'string' })
  password: string;

  @Column({ type: 'enum', enum: ManagerStatus, default: ManagerStatus.PENDING })
  status: ManagerStatus;

  @Column({ type: 'array', default: [ManagersRolesEnum.USER] })
  roles: ManagersRolesEnum[];

  @Column({
    type: 'enum',
    enum: ManagersPlansEnum,
    default: ManagersPlansEnum.BASIC,
  })
  plan: ManagersPlansEnum;
}
