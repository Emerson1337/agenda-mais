import { ManagerStatus } from '@/domain/entities/enums/managers-status.enum';

import BaseEntity from './config/base.entity';
import { ManagersPlansEnum } from './enums/managers-plans.enum';
import { ManagersRolesEnum } from './enums/managers-roles.enum';
import { ThemePalettesEnum } from './enums/theme-palettes.enum';

export class BookingManagers extends BaseEntity {
  welcomeMessage?: string;
  username: string;
  businessName: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  profilePhoto?: string;
  appointmentsPerPhone?: number;
  googleId?: string;
  password?: string;
  status: ManagerStatus;
  roles: ManagersRolesEnum[];
  plan: ManagersPlansEnum;
  palette: ThemePalettesEnum;
}
