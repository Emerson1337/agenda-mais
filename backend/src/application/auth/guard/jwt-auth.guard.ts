import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenAdapter } from '@src/infra/adapters/token.adapter';
import { AuthService } from '../auth.service';

export interface Token {
  sub: string;
  username: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  reflector: Reflector;

  constructor(
    private authService: AuthService,
    private tokenAdapter: TokenAdapter,
  ) {
    this.reflector = new Reflector();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authRequired = this.reflector.get<boolean>(
      'isAuthRequired',
      context.getHandler(),
    );

    if (!authRequired) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const validToken = await this.tokenAdapter.verifyToken(token);

      if (!validToken) throw new Error();

      const payload = this.tokenAdapter.decodeToken(token);

      const user = await this.authService.validateDecodedUser(payload);

      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
