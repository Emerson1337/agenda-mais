export class MissingParamError extends Error {
  status: number;
  constructor(paramName: string, statusCode = 400) {
    super(`Missing param: ${paramName}`);
    this.name = 'MissingParamError';
    this.message = `Missing param: ${paramName}`;
    this.status = statusCode;
  }
}
