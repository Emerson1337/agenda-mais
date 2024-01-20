import { Module } from '@nestjs/common';
import { BookingManagersModule } from './application/booking-managers/booking-managers.module';
import { AuthModule } from './application/auth/auth.module';

@Module({
  imports: [BookingManagersModule, AuthModule],
})
export class AppModule {}
