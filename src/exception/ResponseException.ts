export class ResponseException extends Error {
  private readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  getStatusCode(): number {
    return this.statusCode;
  }
}