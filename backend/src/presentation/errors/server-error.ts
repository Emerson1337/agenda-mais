export class ServerError extends Error {
  status: number;
  constructor(stack?: string, statusCode = 500) {
    super('Internal server error');
    this.name = 'ServerError';
    this.stack = stack;
    this.status = statusCode;
  }
}
