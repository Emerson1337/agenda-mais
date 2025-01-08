import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';

import { AppModule } from './app.module';
import { classValidatorExceptionFactory } from './presentation/errors/exceptions/class-validator-factory.exception';
import { I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [/^https?:\/\/(.*\.)?agendazap\.click$/],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: classValidatorExceptionFactory,
      stopAtFirstError: true,
    }),
    new I18nValidationPipe(),
  );
  app.use('/public', express.static('public'));
  await app.listen(4000);
}
bootstrap();
