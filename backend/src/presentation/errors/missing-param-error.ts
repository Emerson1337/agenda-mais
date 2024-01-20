import { HttpStatus } from '@nestjs/common';
import { ErrorCodes } from './error-codes';

export class MissingParamError extends Error {
  status: number;

  constructor(paramName: string, statusCode = HttpStatus.BAD_REQUEST) {
    super(`Missing param: ${paramName}`);
    this.name = ErrorCodes.MISSING_PARAM_ERROR;
    this.message = `Missing param: ${paramName}`;
    this.status = statusCode;
  }
}
