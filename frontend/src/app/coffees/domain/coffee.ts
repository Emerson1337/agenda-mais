export class Coffee {
  name: string;
  description: string;
  picture: string;
  type: "ROBUSTA" | "ARABIC";
  created_at?: Date;

  constructor(data: Coffee) {
    this.name = data.name;
    this.description = data.description;
    this.picture = data.picture;
    this.type = data.type;
    this.created_at = data.created_at;
  }

  public getDate?(): string {
    return this.created_at.toString();
  }
}
