export class HTTPException extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
  }
}
