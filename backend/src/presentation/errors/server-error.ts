import { HttpStatus } from '@nestjs/common';
import { errorCodes } from './error-codes';

export class ServerError extends Error {
  status: number;

  constructor(stack?: string, statusCode = HttpStatus.INTERNAL_SERVER_ERROR) {
    super('Internal server error');
    this.name = errorCodes.SERVER_ERROR;
    this.stack = stack;
    this.status = statusCode;
  }
}
