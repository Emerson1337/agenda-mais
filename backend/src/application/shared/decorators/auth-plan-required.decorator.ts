import { SetMetadata } from '@nestjs/common';
import { ManagersPlansEnum } from '@src/domain/entities/enums/managers-plans.enum';

export const PlanRequired = (plan: ManagersPlansEnum) =>
  SetMetadata('authPlanRequired', plan);
