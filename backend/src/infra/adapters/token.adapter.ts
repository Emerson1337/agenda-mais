import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@/application/auth/dtos/token-dto';

export class TokenAdapter {
  async generateToken(
    payload: TokenPayload,
    option = 'accessToken' || 'refreshToken' || 'resetToken',
  ): Promise<string> {
    let secret: string;
    let expiresIn: string;

    switch (option) {
      case 'accessToken':
        secret = process.env.ACCESS_TOKEN_SECRET;
        expiresIn = process.env.ACCESS_TOKEN_EXPIRATION;
        break;
      case 'refreshToken':
        secret = process.env.REFRESH_TOKEN_SECRET;
        expiresIn = process.env.REFRESH_TOKEN_EXPIRATION;
        break;
      case 'resetToken':
        secret = process.env.RESET_TOKEN_SECRET;
        expiresIn = process.env.RESET_TOKEN_EXPIRATION;
        break;
      default:
        break;
    }

    return await new JwtService().signAsync(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }

  async verifyToken(
    token: string,
    option = 'accessToken' || 'refreshToken' || 'resetToken',
  ): Promise<boolean> {
    try {
      let secret: string;

      switch (option) {
        case 'accessToken':
          secret = process.env.ACCESS_TOKEN_SECRET;
          break;
        case 'refreshToken':
          secret = process.env.REFRESH_TOKEN_SECRET;
          break;
        case 'resetToken':
          secret = process.env.RESET_TOKEN_SECRET;
          break;
        default:
          break;
      }

      await new JwtService().verifyAsync(token, {
        secret: secret,
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
