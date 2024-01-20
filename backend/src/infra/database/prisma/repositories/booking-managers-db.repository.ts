import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BookingManagers } from '@src/domain/entities/booking-managers.entity';

@Injectable()
export class PrismaBookingManagersRepository {
  constructor(private prisma: PrismaService) {}
  getAll(): Promise<BookingManagers[]> {
    return this.prisma.bookingManagers.findMany() as unknown as Promise<
      BookingManagers[]
    >;
  }
  findByName(name: string): Promise<BookingManagers> {
    throw new Error(`Method not implemented. ${name}`);
  }

  async create(bookingManager: BookingManagers): Promise<BookingManagers> {
    throw new Error(`Method not implemented. ${bookingManager.firstName}`);
  }
}
