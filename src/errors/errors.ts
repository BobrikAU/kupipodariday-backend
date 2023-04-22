import { HTTP_CODE_FORBIDDEN } from '../constants';

export class ServerError extends Error {
  constructor(messege: string) {
    super(messege);
    this.name = 'Sever Error';
  }
}

export class ForbiddenActionError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'Forbidden Action';
    this.statusCode = HTTP_CODE_FORBIDDEN;
  }
}
