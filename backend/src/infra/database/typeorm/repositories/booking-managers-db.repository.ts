import { Injectable } from '@nestjs/common';
import { BookingManagersRepository } from '@src/domain/repositories/booking-managers.repository';
import { MongoRepository } from 'typeorm';

import { BookingManagersMDB } from '../entities/booking-managers-db.entity';
import { TypeormService } from '../typeorm.service';
import { BookingManagers } from '@src/domain/entities/booking-managers.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class TypeOrmBookingManagersRepository
  implements BookingManagersRepository
{
  repository: MongoRepository<BookingManagersMDB>;

  constructor(private typeormService: TypeormService) {
    this.repository = typeormService.getMongoRepository(BookingManagersMDB);
  }
  async findById(id: string): Promise<BookingManagers> {
    return await this.repository.findOneBy({ _id: new ObjectId(id) });
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
