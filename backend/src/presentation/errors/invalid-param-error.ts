export class InvalidParamError extends Error {
  status: number;

  constructor(paramName: string, message?: string, statusCode = 422) {
    super(`Invalid param: ${paramName}. ${message}`);
    this.name = 'InvalidParamError';
    this.message = `Invalid param: ${paramName}. ${message}`;
    this.status = statusCode;
  }
}
