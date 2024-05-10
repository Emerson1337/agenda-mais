import { Injectable } from '@nestjs/common';
import { BookingManagers } from '@/domain/entities/booking-managers.entity';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaBookingManagersRepository {
  constructor(private prisma: PrismaService) {}
  getAll(): Promise<BookingManagers[]> {
    throw new Error(`Method not implemented. ${name}`);
  }
  findByName(name: string): Promise<BookingManagers> {
    throw new Error(`Method not implemented. ${name}`);
  }

  async create(bookingManager: BookingManagers): Promise<BookingManagers> {
    throw new Error(`Method not implemented. ${bookingManager.firstName}`);
  }
}
