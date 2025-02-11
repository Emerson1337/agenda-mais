import { OmitType } from '@nestjs/swagger';
import BaseEntity from '@/domain/entities/config/base.entity';
import {
  CreateDateColumn,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

class BaseEntityMDB extends OmitType(BaseEntity, ['id'] as const) {
  @ObjectIdColumn()
  _id: string | undefined;

  @PrimaryColumn()
  @ObjectIdColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default BaseEntityMDB;
