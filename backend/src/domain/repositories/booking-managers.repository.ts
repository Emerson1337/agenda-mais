import { CreateUpdateManagerDto } from '@src/application/booking-managers/dtos/create-update-manager-dto';
import { BookingManagers } from '@src/domain/entities/booking-managers.entity';

export abstract class BookingManagersRepository {
  abstract create(coffee: CreateUpdateManagerDto): Promise<BookingManagers>;
  abstract getAll(): Promise<Array<BookingManagers>>;
  abstract findByUsername(username: string): Promise<BookingManagers>;
  abstract findByEmail(email: string): Promise<BookingManagers>;
  abstract findByPhone(phone: string): Promise<BookingManagers>;
}
