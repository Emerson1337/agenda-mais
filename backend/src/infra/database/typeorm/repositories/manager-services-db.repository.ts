import { Injectable } from '@nestjs/common';
import { CreateUpdateManagerServiceDto } from '@src/application/manager-services/dtos/create-update-manager-service.dto';
import { ManagerServices } from '@src/domain/entities/manager-services.entity';
import { ManagerServicesRepository } from '@src/domain/repositories/manager-services.repository';
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
    return await this.repository.find({
      where: { managerId },
    });
  }

  async deleteById(managerServiceId: string, managerId: string): Promise<void> {
    await this.repository.deleteOne({
      managerId,
      _id: new ObjectId(managerServiceId),
    });
    return;
  }

  async create(
    managerServiceData: CreateUpdateManagerServiceDto,
  ): Promise<ManagerServices> {
    return await this.repository.save(managerServiceData);
  }

  async update(
    id: string,
    managerServiceData: CreateUpdateManagerServiceDto,
    managerId: string,
  ): Promise<ManagerServices> {
    return (await this.repository.findOneAndUpdate(
      {
        _id: new ObjectId(id),
        managerId,
      },
      { $set: managerServiceData },
    )) as ManagerServices;
  }

  async findByName(name: string, managerId: string): Promise<ManagerServices> {
    return await this.repository.findOne({
      where: { name, managerId },
    });
  }

  async findByNameInUse(
    name: string,
    managerServiceId: string,
    managerId: string,
  ): Promise<ManagerServices> {
    return await this.repository.findOne({
      where: { _id: { $ne: new ObjectId(managerServiceId) }, managerId, name },
    });
  }
  async getAll(managerId: string): Promise<ManagerServices[]> {
    return await this.repository.find({ managerId });
  }

  async findById(
    managerServiceId: string,
    managerId: string,
  ): Promise<ManagerServices> {
    return await this.repository.findOneBy({
      _id: new ObjectId(managerServiceId),
      managerId,
    });
  }
}
