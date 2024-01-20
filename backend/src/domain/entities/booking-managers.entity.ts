import { ManagerStatus } from '@src/domain/entities/enums/managers-status.enum';

import BaseEntity from './config/base.entity';

export class BookingManagers extends BaseEntity {
  welcomeMessage?: string;
  username: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  profilePhoto?: string;
  appointmentsPerPhone?: number;
  googleId?: string;
  password?: string;
  status: ManagerStatus;
}
