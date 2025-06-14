import { UserDto } from '@/application/auth/dtos/user-dto';
import { CreateManagerDto } from '@/application/booking-managers/dtos/create-manager-dto';
import { UpdateManagerAdminDto } from '@/application/booking-managers/dtos/update-manager-admin-dto';
import { BookingManagers } from '@/domain/entities/booking-managers.entity';
import { UpdateManagerDto } from '@/application/booking-managers/dtos/update-manager-dto';

export abstract class BookingManagersRepository {
  abstract create(manager: CreateManagerDto): Promise<BookingManagers>;
  abstract update(
    id: string,
    manager: UpdateManagerDto,
  ): Promise<BookingManagers>;
  abstract updatePicture(id: string, picture: string): Promise<BookingManagers>;
  abstract updateAsAdmin(
    id: string,
    manager: UpdateManagerAdminDto,
  ): Promise<BookingManagers>;
  abstract updatePasswordById(
    id: string,
    password: string,
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
