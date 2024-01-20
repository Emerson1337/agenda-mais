import { HttpStatus } from '@nestjs/common';
import { errorCodes } from './error-codes';

export class InvalidParamError extends Error {
  status: number;

  constructor(
    paramName: string,
    message?: string,
    statusCode = HttpStatus.UNPROCESSABLE_ENTITY,
  ) {
    super(`Invalid param: ${paramName}. ${message}`);
    this.name = paramName;
    this.stack = errorCodes.INVALID_PARAM_ERROR;
    this.message = `${message}`;
    this.status = statusCode;
  }
}

export class MultipleErrors extends Error {
  public errors: InvalidParamError[];
  status: number;

  constructor(errors: InvalidParamError[]) {
    super('Multiple errors occurred');
    this.name = errorCodes.MULTIPLE_INVALID_PARAM_ERRORS;
    this.status = HttpStatus.UNPROCESSABLE_ENTITY;
    this.stack = errorCodes.MULTIPLE_INVALID_PARAM_ERRORS;
    this.errors = errors;
  }
}
