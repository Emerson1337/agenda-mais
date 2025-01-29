import { ManagersPlansEnum } from '@/domain/entities/enums/managers-plans.enum';
import { ManagersRolesEnum } from '@/domain/entities/enums/managers-roles.enum';
import { ManagerStatus } from '@/domain/entities/enums/managers-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateManagerAdminDto {
  @IsOptional()
  @IsEnum(ManagerStatus, {
    message: 'O campo status deve ser um valor válido.',
  })
  status: ManagerStatus;

  @IsEnum(ManagersRolesEnum, {
    each: true,
    message: 'Cada valor do campo roles deve ser um valor válido.',
  })
  roles: ManagersRolesEnum[];

  @IsEnum(ManagersPlansEnum, {
    message: 'O campo plano deve ser um valor válido.',
  })
  plan: ManagersPlansEnum;
}
