import { CreateUpdateManagerServiceDto } from '@/application/manager-services/dtos/create-update-manager-service.dto';

import { ManagerServices } from '../entities/manager-services.entity';

export abstract class ManagerServicesRepository {
  abstract create(
    managerServiceData: CreateUpdateManagerServiceDto,
  ): Promise<ManagerServices>;
  abstract update(
    managerServiceId: string,
    managerServiceData: CreateUpdateManagerServiceDto,
    managerId: string,
  ): Promise<ManagerServices>;
  abstract getByManagerId(managerId: string): Promise<ManagerServices[]>;
  abstract findByName(
    name: string,
    managerId: string,
  ): Promise<ManagerServices>;
  abstract findByNameInUse(
    name: string,
    managerServiceId: string,
    managerId: string,
  ): Promise<ManagerServices>;
  abstract getAll(managerId: string): Promise<ManagerServices[]>;
  abstract findById({
    managerServiceId,
    managerId,
  }: {
    managerServiceId: string;
    managerId: string;
  }): Promise<ManagerServices>;
  abstract softDeleteById(
    managerServiceId: string,
    managerId: string,
  ): Promise<void>;
}
