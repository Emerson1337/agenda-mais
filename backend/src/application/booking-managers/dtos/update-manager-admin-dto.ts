import { ManagersPlansEnum } from '@src/domain/entities/enums/managers-plans.enum';
import { ManagersRolesEnum } from '@src/domain/entities/enums/managers-roles.enum';
import { ManagerStatus } from '@src/domain/entities/enums/managers-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateManagerAdminDto {
  @IsOptional()
  @IsEnum(ManagerStatus)
  status: ManagerStatus;

  @IsEnum(ManagersRolesEnum, { each: true })
  roles: ManagersRolesEnum[];

  @IsEnum(ManagersPlansEnum)
  plan: ManagersPlansEnum;
}
