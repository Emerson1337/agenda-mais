import { CreateUpdateManagerServiceDto } from '@src/application/manager-services/dtos/create-update-manager-service.dto';

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
  abstract findById(
    managerServiceId: string,
    managerId: string,
  ): Promise<ManagerServices>;
  abstract deleteById(
    managerServiceId: string,
    managerId: string,
  ): Promise<void>;
}
