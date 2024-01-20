import { HttpStatus } from '@nestjs/common';
import { ErrorCodes } from './error-codes';

export class ServerError extends Error {
  status: number;

  constructor(stack?: string, statusCode = HttpStatus.INTERNAL_SERVER_ERROR) {
    super('Internal server error');
    this.name = ErrorCodes.SERVER_ERROR;
    this.stack = stack;
    this.status = statusCode;
  }
}
