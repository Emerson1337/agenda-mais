export class Coffee {
  name: string;
  description: string;
  picture: string;
  type: "ROBUSTA" | "ARABIC";
  createdAt?: Date;

  constructor(data: Coffee) {
    this.name = data.name;
    this.description = data.description;
    this.picture = data.picture;
    this.type = data.type;
    this.createdAt = data.createdAt;
  }

  public getDate?(): string {
    return this.createdAt.toString();
  }
}
