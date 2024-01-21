import { ResetPasswordTokens } from '../entities/reset-password-tokens.entity';

export abstract class ResetPasswordTokensRepository {
  abstract createOrUpdate(
    email: string,
    token: string,
  ): Promise<ResetPasswordTokens>;
  abstract getByToken(token: string): Promise<ResetPasswordTokens>;
  abstract deleteByToken(token: string): Promise<void>;
}
