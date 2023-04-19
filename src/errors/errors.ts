export class ServerError extends Error {
  constructor(messege: string) {
    super(messege);
    this.name = 'Sever Error';
  }
}
