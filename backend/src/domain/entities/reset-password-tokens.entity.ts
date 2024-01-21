import BaseEntity from './config/base.entity';

export class ResetPasswordTokens extends BaseEntity {
  email: string;
  token: string;
}
