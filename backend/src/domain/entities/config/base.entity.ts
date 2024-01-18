import { randomUUID } from 'crypto';

class BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}

export default BaseEntity;
