import { SetMetadata } from '@nestjs/common';
import { ManagersRolesEnum } from '@/domain/entities/enums/managers-roles.enum';

export const RolesAllowed = (roles: ManagersRolesEnum[]) =>
  SetMetadata('rolesAllowed', roles);
