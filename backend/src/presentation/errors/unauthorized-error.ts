import { HttpStatus } from '@nestjs/common';
import { errorCodes } from './error-codes';

export class UnauthorizedError extends Error {
  status: number;

  constructor(
    paramName: string,
    message?: string,
    statusCode = HttpStatus.UNAUTHORIZED,
  ) {
    super(`Invalid param: ${paramName}. ${message}`);
    this.name = paramName;
    this.stack = errorCodes.UNAUTHORIZED_ERROR;
    this.message = `${message}`;
    this.status = statusCode;
  }
}
