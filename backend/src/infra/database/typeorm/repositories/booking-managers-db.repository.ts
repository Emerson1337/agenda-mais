import { Injectable } from '@nestjs/common';
import { BookingManagersRepository } from '@src/domain/repositories/booking-managers.repository';
import { MongoRepository } from 'typeorm';

import { BookingManagersMDB } from '../entities/booking-managers-db.entity';
import { TypeormService } from '../typeorm.service';
import { BookingManagers } from '@src/domain/entities/booking-managers.entity';
import { ObjectId } from 'mongodb';
import { UserDto } from '@src/application/auth/dtos/user-dto';
import { CreateUpdateManagerDto } from '@src/application/booking-managers/dtos/create-update-manager-dto';

@Injectable()
export class TypeOrmBookingManagersRepository
  implements BookingManagersRepository
{
  repository: MongoRepository<BookingManagersMDB>;

  constructor(private typeormService: TypeormService) {
    this.repository = typeormService.getMongoRepository(BookingManagersMDB);
  }
  async update(
    id: string,
    managerUpdated: CreateUpdateManagerDto,
  ): Promise<BookingManagers> {
    const manager = await this.repository.findOne({
      where: { _id: new ObjectId(id) },
    });

    return this.repository.save({
      ...manager,
      ...managerUpdated,
      plan: manager.plan,
      roles: manager.roles,
      status: manager.status,
    });
  }

  async findByUsernameInUse(
    id: string,
    username: string,
  ): Promise<BookingManagers> {
    return await this.repository.findOne({
      where: { _id: { $ne: new ObjectId(id) }, username },
    });
  }
  async findByEmailInUse(id: string, email: string): Promise<BookingManagers> {
    return await this.repository.findOne({
      where: { _id: { $ne: new ObjectId(id) }, email },
    });
  }
  async findByPhoneInUse(id: string, phone: string): Promise<BookingManagers> {
    return await this.repository.findOne({
      where: { _id: { $ne: new ObjectId(id) }, phone },
    });
  }

  async findById(id: string): Promise<BookingManagers> {
    return await this.repository.findOneBy({ _id: new ObjectId(id) });
  }

  async findByIdWithoutPassword(id: string): Promise<UserDto> {
    return await this.repository.findOne({
      where: { _id: new ObjectId(id) },
      select: [
        'id',
        'email',
        'firstName',
        'lastName',
        'username',
        'googleId',
        'roles',
        'plan',
      ],
    });
  }

  async findByEmail(email: string): Promise<BookingManagers> {
    return await this.repository.findOneBy({ email });
  }

  async findByPhone(phone: string): Promise<BookingManagers> {
    return await this.repository.findOneBy({ phone });
  }

  async findByUsername(username: string): Promise<BookingManagers> {
    return await this.repository.findOneBy({ username });
  }

  async create(data: BookingManagersMDB): Promise<BookingManagersMDB> {
    return await this.repository.save(data);
  }

  async getAll(): Promise<Array<BookingManagersMDB>> {
    return await this.repository.find({});
  }

  async findByName(name: string): Promise<BookingManagersMDB> {
    return this.repository.findOne({
      where: { name },
    });
  }
}
