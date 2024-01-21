import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';

import { TypeormService } from '../typeorm.service';
import { ResetPasswordTokensRepository } from '@src/domain/repositories/reset-password-tokens.repository';
import { ResetPasswordTokensMDB } from '../entities/reset-password-tokens-db.entity';
import { ResetPasswordTokens } from '@src/domain/entities/reset-password-tokens.entity';

@Injectable()
export class TypeOrmResetPasswordTokensRepository
  implements ResetPasswordTokensRepository
{
  repository: MongoRepository<ResetPasswordTokensMDB>;

  constructor(private typeormService: TypeormService) {
    this.repository = typeormService.getMongoRepository(ResetPasswordTokensMDB);
  }
  async getByToken(token: string): Promise<ResetPasswordTokens> {
    return await this.repository.findOneBy({ token });
  }

  async deleteByToken(token: string): Promise<void> {
    await this.repository.deleteOne({ token });
    return;
  }

  async createOrUpdate(
    email: string,
    token: string,
  ): Promise<ResetPasswordTokens> {
    return (await this.repository.findOneAndUpdate(
      { email },
      { $set: { email, token } },
      { upsert: true, returnDocument: 'after' },
    )) as ResetPasswordTokens;
  }
}
