import * as bcrypt from 'bcrypt';

export class EncryptAdapter {
  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, '$2b$10$t7oxiwchWGHa/B9w0AzrYO');
  }

  async validatePassword(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, encryptedPassword || '');
  }
}
