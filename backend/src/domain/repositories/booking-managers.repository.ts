import { UserDto } from '@src/application/auth/dtos/user-dto';
import { CreateManagerDto } from '@src/application/booking-managers/dtos/create-manager-dto';
import { UpdateManagerAdminDto } from '@src/application/booking-managers/dtos/update-manager-admin-dto';
import { UpdateManagerDto } from '@src/application/booking-managers/dtos/update-manager-dto';
import { BookingManagers } from '@src/domain/entities/booking-managers.entity';

export abstract class BookingManagersRepository {
  abstract create(manager: CreateManagerDto): Promise<BookingManagers>;
  abstract update(
    id: string,
    manager: UpdateManagerDto,
  ): Promise<BookingManagers>;
  abstract updateAsAdmin(
    id: string,
    manager: UpdateManagerAdminDto,
  ): Promise<BookingManagers>;
  abstract getAll(): Promise<Array<BookingManagers>>;
  abstract findByUsername(username: string): Promise<BookingManagers>;
  abstract findByEmail(email: string): Promise<BookingManagers>;
  abstract findByPhone(phone: string): Promise<BookingManagers>;
  abstract findById(id: string): Promise<BookingManagers>;
  abstract findByIdWithoutPassword(id: string): Promise<UserDto>;
  abstract findByUsernameInUse(
    id: string,
    username: string,
  ): Promise<BookingManagers>;
  abstract findByEmailInUse(
    id: string,
    email: string,
  ): Promise<BookingManagers>;
  abstract findByPhoneInUse(
    id: string,
    phone: string,
  ): Promise<BookingManagers>;
}
