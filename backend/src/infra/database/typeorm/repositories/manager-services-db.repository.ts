import { Injectable } from '@nestjs/common';
import { CreateUpdateManagerServiceDto } from '@/application/manager-services/dtos/create-update-manager-service.dto';
import { ManagerServices } from '@/domain/entities/manager-services.entity';
import { ManagerServicesRepository } from '@/domain/repositories/manager-services.repository';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { ManagerServicesMDB } from '@/infra/database/typeorm/entities/manager-service-db.entity';
import { TypeormService } from '@/infra/database/typeorm/typeorm.service';

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
    return result.map((item) => ({
      ...item,
      id: item._id,

      deletedAt: undefined,
    }));
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
    return {
      ...result,
      id: result._id,
    };
  }

  async update(
    id: string,
    managerServiceData: CreateUpdateManagerServiceDto,
    managerId: string,
  ): Promise<ManagerServices | null> {
    const result = await this.repository.findOneAndUpdate(
      {
        _id: new ObjectId(id),
        managerId,
      },
      { $set: managerServiceData },
      { returnDocument: 'after' },
    );
    return result?.value
      ? {
          ...result.value,
          id: result.value._id,

          deletedAt: undefined,
        }
      : null;
  }

  async findByName(
    name: string,
    managerId: string,
  ): Promise<ManagerServices | null> {
    const result = await this.repository.findOne({
      where: { name, managerId },
    });
    return result
      ? {
          ...result,
          id: result._id,
        }
      : null;
  }

  async findByNameInUse(
    name: string,
    managerServiceId: string,
    managerId: string,
  ): Promise<ManagerServices | null> {
    const result = await this.repository.findOne({
      where: {
        _id: { $ne: new ObjectId(managerServiceId) },
        managerId,
        name,
      },
    });
    return result
      ? {
          ...result,
          id: result._id,
        }
      : null;
  }

  async getAll(managerId: string): Promise<ManagerServices[]> {
    const result = await this.repository.find({ managerId });
    return result.map((item) => ({
      ...item,
      id: item._id,

      deletedAt: undefined,
    }));
  }

  async findById({
    managerServiceId,
    managerId,
  }: {
    managerServiceId: string;
    managerId: string;
  }): Promise<ManagerServices | null> {
    const result = await this.repository.findOneBy({
      _id: new ObjectId(managerServiceId),
      managerId,
    });
    return result
      ? {
          ...result,
          id: result._id,
        }
      : null;
  }
}
