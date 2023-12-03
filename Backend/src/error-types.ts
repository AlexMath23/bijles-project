type ErrorNumber = 404 | 500;

export class HttpError extends Error {
  statusCode: ErrorNumber;

  constructor(statusCode: ErrorNumber, message: string) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }
}
