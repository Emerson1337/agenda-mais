import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log:
        process.env.NODE_ENV === 'development' ||
        (process.env.NODE_ENV === 'staging' &&
          process.env.ENABLE_PRISMA_LOG === 'true')
          ? ['query', 'info', 'warn', 'error']
          : undefined,
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
