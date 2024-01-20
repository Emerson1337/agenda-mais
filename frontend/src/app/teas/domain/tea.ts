export class Tea {
  name: string;
  description: string;
  picture: string;
  createdAt?: Date;

  constructor(data: Tea) {
    this.name = data.name;
    this.description = data.description;
    this.picture = data.picture;
    this.createdAt = data.createdAt;
  }

  public getDate?(): string {
    return this.createdAt.toString();
  }
}
