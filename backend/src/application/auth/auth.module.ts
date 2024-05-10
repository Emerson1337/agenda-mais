import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { AuthController } from '@/presentation/http/controllers/auth.controller';
import { AuthService } from './auth.service';
import { BookingManagersService } from '../booking-managers/booking-managers.service';
import { TokenAdapter } from '@/infra/adapters/token.adapter';
import { FileAdapter } from '@/infra/adapters/file.adapter';
import { EncryptAdapter } from '@/infra/adapters/encrypt.adapter';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MailSenderAdapter } from '@/infra/adapters/mail-sender.adapter';
import { LocaleModule } from '@presentation/locale/locale.module';

@Module({
  imports: [DatabaseModule, LocaleModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    BookingManagersService,
    EncryptAdapter,
    FileAdapter,
    TokenAdapter,
    MailSenderAdapter,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
