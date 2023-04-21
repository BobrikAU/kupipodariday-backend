import { ForbiddenException } from '@nestjs/common';

export class ServerError extends Error {
  constructor(messege: string) {
    super(messege);
    this.name = 'Sever Error';
  }
}

export class ForbiddenActionError extends ForbiddenException {
  constructor(message: string) {
    super(message);
  }
}
