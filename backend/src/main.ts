import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';

import { AppModule } from './app.module';
import { classValidatorExceptionFactory } from './presentation/errors/exceptions/class-validator-factory.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: classValidatorExceptionFactory,
      stopAtFirstError: true,
    }),
  );
  app.use('/public', express.static('public'));
  await app.listen(3000);
}
bootstrap();
