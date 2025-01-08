import { Controller, Get, Res } from '@nestjs/common';
import { handleError, ok } from '@/presentation/helpers/http.helper';
import { Response } from 'express';

@Controller('infra')
export class InfraController {
  constructor() {}

  @Get('health-check')
  async create(@Res() response: Response) {
    try {
      console.log('🟢🟢🟢🟢 test check');

      return response.status(200).send(ok({ message: 'API is running' }));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }
}
