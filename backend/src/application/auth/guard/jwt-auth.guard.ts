import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenAdapter } from '@/infra/adapters/token.adapter';

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
    console.log('🟢🟢🟢🟢 token', request.headers);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const validToken = await this.tokenAdapter.verifyToken(token);

      if (!validToken) throw new Error();

      const payload = this.tokenAdapter.decodeToken(token);

      const user = await this.authService.validateDecodedUser(payload);

      await this.checkRoles(user.roles, context);

      await this.checkPlan(user.plan, context);

      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private async checkRoles(userRoles: string[], context: ExecutionContext) {
    const rolesAllowed = this.reflector.get<string[]>(
      'rolesAllowed',
      context.getHandler(),
    );

    if (!rolesAllowed) return true;

    const validRole = userRoles.some((userRole) =>
      rolesAllowed.includes(userRole),
    );

    if (validRole) return true;

    throw new Error();
  }

  private async checkPlan(userPlan: string, context: ExecutionContext) {
    const authPlanRequired = this.reflector.get<string>(
      'authPlanRequired',
      context.getHandler(),
    );

    if (!authPlanRequired || authPlanRequired === userPlan) {
      return authPlanRequired;
    }

    throw new Error();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
