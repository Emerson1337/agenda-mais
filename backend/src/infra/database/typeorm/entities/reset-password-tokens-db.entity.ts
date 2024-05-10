import { Column, Entity } from 'typeorm';

import BaseEntityMDB from './config/base.entity';
import { ResetPasswordTokens } from '@/domain/entities/reset-password-tokens.entity';

@Entity('ResetPasswordTokens')
export class ResetPasswordTokensMDB
  extends BaseEntityMDB
  implements ResetPasswordTokens
{
  @Column({ type: 'string' })
  email: string;

  @Column({ type: 'string' })
  token: string;
}
