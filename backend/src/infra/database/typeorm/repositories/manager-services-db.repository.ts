import { Injectable } from '@nestjs/common';
import { CreateUpdateManagerServiceDto } from '@/application/manager-services/dtos/create-update-manager-service.dto';
import { ManagerServices } from '@/domain/entities/manager-services.entity';
import { ManagerServicesRepository } from '@/domain/repositories/manager-services.repository';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';

import { ManagerServicesMDB } from '../entities/manager-service-db.entity';
import { TypeormService } from '../typeorm.service';

@Injectable()
export class TypeOrmManagerServicesRepository
  implements ManagerServicesRepository
{
  repository: MongoRepository<ManagerServicesMDB>;

  constructor(private typeormService: TypeormService) {
    this.repository = typeormService.getMongoRepository(ManagerServicesMDB);
  }

  async getByManagerId(managerId: string): Promise<ManagerServices[]> {
    const result = await this.repository.find({
      where: { managerId },
    });
    result.forEach((item) => delete item.deletedAt);
    return result;
  }

  async softDeleteById(
    managerServiceId: string,
    managerId: string,
  ): Promise<void> {
    await this.repository.updateOne(
      { managerId, _id: new ObjectId(managerServiceId) },
      { $set: { deletedAt: new Date() } },
    );
  }

  async create(
    managerServiceData: CreateUpdateManagerServiceDto,
  ): Promise<ManagerServices> {
    const result = await this.repository.save(managerServiceData);
    delete result.deletedAt;
    return result;
  }

  async update(
    id: string,
    managerServiceData: CreateUpdateManagerServiceDto,
    managerId: string,
  ): Promise<ManagerServices> {
    const result = await this.repository.findOneAndUpdate(
      {
        _id: new ObjectId(id),
        managerId,
      },
      { $set: managerServiceData },
    );
    if (result?.value) delete result.value.deletedAt;
    return result.value;
  }

  async findByName(name: string, managerId: string): Promise<ManagerServices> {
    const result = await this.repository.findOne({
      where: { name, managerId },
    });
    if (result) delete result.deletedAt;
    return result;
  }

  async findByNameInUse(
    name: string,
    managerServiceId: string,
    managerId: string,
  ): Promise<ManagerServices> {
    const result = await this.repository.findOne({
      where: {
        _id: { $ne: new ObjectId(managerServiceId) },
        managerId,
        name,
      },
    });
    if (result) delete result.deletedAt;
    return result;
  }

  async getAll(managerId: string): Promise<ManagerServices[]> {
    const result = await this.repository.find({ managerId });
    result.forEach((item) => delete item.deletedAt);
    return result;
  }

  async findById({
    managerServiceId,
    managerId,
  }: {
    managerServiceId: string;
    managerId: string;
  }): Promise<ManagerServices> {
    const result = await this.repository.findOneBy({
      _id: new ObjectId(managerServiceId),
      managerId,
    });
    if (result) delete result.deletedAt;
    return result;
  }
}
