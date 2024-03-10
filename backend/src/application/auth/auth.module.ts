import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/infra/database/database.module';
import { AuthController } from '@src/presentation/http/controllers/auth.controller';
import { AuthService } from './auth.service';
import { BookingManagersService } from '../booking-managers/booking-managers.service';
import { TokenAdapter } from '@src/infra/adapters/token.adapter';
import { FileAdapter } from '@src/infra/adapters/file.adapter';
import { EncryptAdapter } from '@src/infra/adapters/encrypt.adapter';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MailSenderAdapter } from '@src/infra/adapters/mail-sender.adapter';
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
