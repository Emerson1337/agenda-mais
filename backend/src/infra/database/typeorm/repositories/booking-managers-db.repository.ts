import { Injectable } from '@nestjs/common';
import { UserDto } from '@/application/auth/dtos/user-dto';
import { CreateManagerDto } from '@/application/booking-managers/dtos/create-manager-dto';
import { BookingManagers } from '@/domain/entities/booking-managers.entity';
import { BookingManagersRepository } from '@/domain/repositories/booking-managers.repository';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';

import { BookingManagersMDB } from '../entities/booking-managers-db.entity';
import { TypeormService } from '../typeorm.service';
import { UpdateManagerDto } from '@/application/booking-managers/dtos/update-manager-dto';
import { UpdateManagerAdminDto } from '@/application/booking-managers/dtos/update-manager-admin-dto';

@Injectable()
export class TypeOrmBookingManagersRepository
  implements BookingManagersRepository
{
  repository: MongoRepository<BookingManagersMDB>;

  constructor(private typeormService: TypeormService) {
    this.repository = typeormService.getMongoRepository(BookingManagersMDB);
  }

  async updatePasswordById(
    id: string,
    password: string,
  ): Promise<BookingManagers> {
    return (await this.repository.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { password } },
    )) as BookingManagers;
  }

  async update(
    id: string,
    managerUpdated: UpdateManagerDto,
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

  async updatePicture(id: string, picture: string): Promise<BookingManagers> {
    const manager = await this.repository.findOne({
      where: { _id: new ObjectId(id) },
    });

    return this.repository.save({
      ...manager,
      profilePhoto: picture,
    });
  }

  async updateAsAdmin(
    id: string,
    managerUpdated: UpdateManagerAdminDto,
  ): Promise<BookingManagers> {
    const manager = await this.repository.findOne({
      where: { _id: new ObjectId(id) },
    });

    return this.repository.save({
      ...manager,
      ...managerUpdated,
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

  async create(data: CreateManagerDto): Promise<BookingManagersMDB> {
    const bookingManager = await this.repository.save({
      appointmentsPerPhone: data.appointmentsPerPhone,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      phone: data.phone,
      plan: data.plan,
      profilePhoto: data.profilePhoto,
      roles: data.roles,
      status: data.status,
      username: data.username,
      businessName: data.businessName,
      welcomeMessage: data.welcomeMessage,
      palette: data.palette,
    });
    delete bookingManager.password;
    return bookingManager;
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
