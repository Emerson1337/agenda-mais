import { Injectable } from '@nestjs/common';
import { EncryptAdapter } from '@src/infra/adapters/encrypt.adapter';
import { TokenAdapter } from '@src/infra/adapters/token.adapter';
import { UnauthorizedError } from '@src/presentation/errors/unauthorized-error';

import { BookingManagersService } from '../booking-managers/booking-managers.service';
import { TokenPayload, TokenResponse } from './dtos/token-dto';
import { UserDto } from './dtos/user-dto';
import { InvalidParamError, ServerError } from '@src/presentation/errors';
import { ResetPasswordTokensRepository } from '../../domain/repositories/reset-password-tokens.repository';
import { MailSenderAdapter } from '../../infra/adapters/mail-sender.adapter';
import { generateFrontendUrl } from '../shared/utils/frontendPathGenerator';

export interface SocialUserDto {
  id: number | string;
  name: string;
  email: string;
}

export type GetSocialUserDtoHandler = () => Promise<Partial<SocialUserDto>>;

@Injectable()
export class AuthService {
  constructor(
    private bookingManagersService: BookingManagersService,
    private tokenService: TokenAdapter,
    private encryptAdapter: EncryptAdapter,
    private resetPasswordTokensRepository: ResetPasswordTokensRepository,
    private mailSenderAdapter: MailSenderAdapter,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.bookingManagersService.getManagerByEmail(email);

    if (!user) {
      throw new UnauthorizedError('email/password', 'Invalid credentials.');
    }

    if (
      !(await this.encryptAdapter.validatePassword(password, user.password))
    ) {
      throw new UnauthorizedError('email/password', 'Invalid credentials.');
    }

    return user;
  }

  async login(user: UserDto): Promise<TokenResponse> {
    const payload: TokenPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      plan: user.plan,
      status: user.status,
    };

    const refresh_token = await this.tokenService.generateToken(
      payload,
      'refreshToken',
    );

    return {
      user: { ...user, password: undefined },
      access_token: await this.tokenService.generateToken(payload),
      refresh_token,
    };
  }

  async loginWithRefreshToken(refreshToken: string) {
    try {
      const validToken = await this.tokenService.verifyToken(
        refreshToken,
        'refreshToken',
      );

      if (!validToken) {
        throw new Error();
      }

      const decoded = this.tokenService.decodeToken(
        refreshToken,
      ) as TokenPayload;

      if (!decoded) {
        throw new Error();
      }

      const user = await this.validateDecodedUser(decoded);

      return this.login(user);
    } catch {
      throw new UnauthorizedError('refreshToken', 'Invalid refresh token.');
    }
  }

  async forgotPassword(
    email: string,
  ): Promise<{ success: boolean; message: string }> {
    const user = await this.bookingManagersService.getManagerByEmail(email);

    if (!user) throw new InvalidParamError('email', 'Invalid Email');

    const token = await this.tokenService.generateToken({
      sub: user.id,
      email,
    });

    await this.resetPasswordTokensRepository.createOrUpdate(email, token);

    try {
      await this.mailSenderAdapter.sendMail({
        to: email,
        subject: 'Solicitação para alterar senha',
        text: 'Clique no botão abaixo para alterar a sua senha.',
        variables: {
          resetLink: generateFrontendUrl(`/reset-password?token=${token}`),
        },
        view: 'reset_password',
      });

      return {
        success: true,
        message:
          'Um link para resetar a sua senha foi encaminhado para o seu email',
      };
    } catch (e) {
      throw new ServerError();
    }
  }

  async resetPassword(password: string, resetToken: string): Promise<object> {
    await this.tokenService.verifyToken(resetToken, 'resetToken');

    const tokenDecoded = this.tokenService.decodeToken(resetToken);

    const resetTokenData =
      await this.resetPasswordTokensRepository.getByToken(resetToken);

    if (!resetTokenData) throw new InvalidParamError('token', 'Invalid token');

    await this.resetPasswordTokensRepository.deleteByToken(resetToken);

    await this.bookingManagersService.updatePasswordById(
      tokenDecoded.sub!,
      password,
    );

    try {
      await this.mailSenderAdapter.sendMail({
        to: resetTokenData.email,
        subject: 'Senha alterada com sucesso!',
        text: `A sua senha foi alterada com sucesso. Caso esta operação não tenha sido realizada por você, entre em contato com ${process.env.MAIL_SENDER}`,
        view: 'password_changed',
      });

      return {
        success: true,
        message: 'Senha alterada com sucesso!',
      };
    } catch (e) {
      throw new ServerError();
    }
  }

  async validateDecodedUser(decodedUser: TokenPayload): Promise<UserDto> {
    return await this.bookingManagersService.getManagerById(decodedUser.sub);
  }
}
