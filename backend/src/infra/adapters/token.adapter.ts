import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@src/application/auth/dtos/token-dto';

export class TokenAdapter {
  async generateToken(
    payload: TokenPayload,
    option = 'accessToken' || 'refreshToken',
  ): Promise<string> {
    return await new JwtService().signAsync(payload, {
      secret:
        option === 'accessToken'
          ? process.env.ACCESS_TOKEN_SECRET
          : process.env.REFRESH_TOKEN_SECRET,
      expiresIn:
        option === 'accessToken'
          ? process.env.ACCESS_TOKEN_EXPIRATION
          : process.env.REFRESH_TOKEN_EXPIRATION,
    });
  }

  async verifyToken(
    token: string,
    option = 'accessToken' || 'refreshToken',
  ): Promise<boolean> {
    try {
      await new JwtService().verifyAsync(token, {
        secret:
          option === 'accessToken'
            ? process.env.ACCESS_TOKEN_SECRET
            : process.env.REFRESH_TOKEN_SECRET,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  decodeToken(token: string): TokenPayload {
    return new JwtService().decode(token) as TokenPayload;
  }
}
