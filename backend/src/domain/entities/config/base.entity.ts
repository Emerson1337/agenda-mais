import { randomUUID } from 'crypto';

class BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}

export default BaseEntity;
