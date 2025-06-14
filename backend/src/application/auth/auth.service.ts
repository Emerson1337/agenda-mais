import { HttpStatus, Injectable } from '@nestjs/common';
import { EncryptAdapter } from '@/infra/adapters/encrypt.adapter';
import { TokenAdapter } from '@/infra/adapters/token.adapter';
import {
  InvalidParamError,
  MultipleErrors,
  ServerError,
} from '@/presentation/errors';
import { UnauthorizedError } from '@/presentation/errors/unauthorized-error';

import { ResetPasswordTokensRepository } from '@/domain/repositories/reset-password-tokens.repository';
import { MailSenderAdapter } from '@/infra/adapters/mail-sender.adapter';
import { BookingManagersService } from '@/application/booking-managers/booking-managers.service';
import { generateFrontendUrl } from '@/application/shared/utils/frontendPathGenerator';
import { LoginDto, ResetPasswordDto } from '@/application/auth/dtos/login-dto';
import { TokenPayload, TokenResponse } from '@/application/auth/dtos/token-dto';
import { UserDto } from '@/application/auth/dtos/user-dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { SignUpDto } from '@/application/auth/dtos/signup-dto';
import { BookingManagers } from '@/domain/entities/booking-managers.entity';
import RecaptchaService from '@/application/shared/services/recaptcha';

export interface SocialUserDto {
  id: number | string;
  name: string;
  email: string;
}

export type GetSocialUserDtoHandler = () => Promise<Partial<SocialUserDto>>;

@Injectable()
export class AuthService {
  constructor(
    private readonly bookingManagersService: BookingManagersService,
    private readonly tokenService: TokenAdapter,
    private readonly encryptAdapter: EncryptAdapter,
    private readonly resetPasswordTokensRepository: ResetPasswordTokensRepository,
    private readonly mailSenderAdapter: MailSenderAdapter,
    private readonly i18n: I18nService,
  ) {}

  async validate({ email, password }: LoginDto) {
    const user = await this.bookingManagersService.getManagerByEmail(email);

    if (!user) {
      throw new MultipleErrors(
        [
          new UnauthorizedError(
            'email',
            this.i18n.t('translations.INVALID_FIELD.INVALID_CREDENTIALS', {
              lang: I18nContext.current().lang,
            }),
          ),
          new UnauthorizedError(
            'password',
            this.i18n.t('translations.INVALID_FIELD.INVALID_CREDENTIALS', {
              lang: I18nContext.current().lang,
            }),
          ),
        ],
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (
      !(await this.encryptAdapter.validatePassword(password, user.password))
    ) {
      throw new MultipleErrors(
        [
          new UnauthorizedError(
            'email',
            this.i18n.t('translations.INVALID_FIELD.INVALID_CREDENTIALS', {
              lang: I18nContext.current().lang,
            }),
          ),
          new UnauthorizedError(
            'password',
            this.i18n.t('translations.INVALID_FIELD.INVALID_CREDENTIALS', {
              lang: I18nContext.current().lang,
            }),
          ),
        ],
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  async create(manager: SignUpDto): Promise<BookingManagers | Error> {
    const validCaptcha = await RecaptchaService.validateResponse(
      manager.recaptchaToken,
    );

    if (!validCaptcha) {
      throw new InvalidParamError(
        'username',
        this.i18n.t('translations.CAPTCHA.INVALID', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return await this.bookingManagersService.create(manager);
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
      throw new UnauthorizedError(
        'refreshToken',
        this.i18n.t('translations.INVALID_FIELD.INVALID_REFRESH_TOKEN', {
          lang: I18nContext.current().lang,
        }),
      );
    }
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

  async verifyToken(token: string) {
    try {
      const validToken = await this.tokenService.verifyToken(
        token,
        'accessToken',
      );

      if (!validToken) {
        throw new Error();
      }

      const decoded = this.tokenService.decodeToken(token) as TokenPayload;

      if (!decoded) {
        throw new Error();
      }

      return true;
    } catch {
      throw new UnauthorizedError(
        'accessToken',
        this.i18n.t('translations.INVALID_FIELD.INVALID_REFRESH_TOKEN', {
          lang: I18nContext.current().lang,
        }),
      );
    }
  }

  async forgotPassword(
    email: string,
    recaptchaToken: string,
  ): Promise<{ success: boolean; message: string }> {
    const validCaptcha =
      await RecaptchaService.validateResponse(recaptchaToken);

    if (!validCaptcha) {
      throw new InvalidParamError(
        'username',
        this.i18n.t('translations.CAPTCHA.INVALID', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const user = await this.bookingManagersService.getManagerByEmail(email);

    if (!user)
      throw new InvalidParamError(
        'email',
        this.i18n.t('translations.INVALID_FIELD.INVALID_EMAIL', {
          lang: I18nContext.current().lang,
        }),
      );

    const token = await this.tokenService.generateToken({
      sub: user.id,
      email,
    });

    await this.resetPasswordTokensRepository.createOrUpdate(email, token);

    try {
      await this.mailSenderAdapter.sendMail({
        to: email,
        subject: this.i18n.t('translations.CHANGE_PASSWORD.SUBJECT', {
          lang: I18nContext.current().lang,
        }),
        text: this.i18n.t('translations.CHANGE_PASSWORD.TEXT', {
          lang: I18nContext.current().lang,
        }),
        variables: {
          resetLink: generateFrontendUrl(`/recuperar-conta?token=${token}`),
        },
        view: 'reset_password',
      });

      return {
        success: true,
        message: this.i18n.t(
          'translations.CHANGE_PASSWORD.REQUEST_SUCCESSFULLY',
          {
            lang: I18nContext.current().lang,
          },
        ),
      };
    } catch (e) {
      throw new ServerError();
    }
  }

  async resetPassword({
    password,
    resetToken,
  }: ResetPasswordDto): Promise<object> {
    await this.tokenService.verifyToken(resetToken, 'resetToken');

    const tokenDecoded = this.tokenService.decodeToken(resetToken);

    const resetTokenData =
      await this.resetPasswordTokensRepository.getByToken(resetToken);

    if (!resetTokenData)
      throw new InvalidParamError(
        'token',
        this.i18n.t('translations.INVALID_FIELD.INVALID_TOKEN', {
          lang: I18nContext.current().lang,
        }),
      );

    await this.resetPasswordTokensRepository.deleteByToken(resetToken);

    await this.bookingManagersService.updatePasswordById({
      managerId: tokenDecoded.sub!,
      password,
    });

    try {
      await this.mailSenderAdapter.sendMail({
        to: resetTokenData.email,
        subject: this.i18n.t('translations.CHANGED_PASSWORD.SUBJECT', {
          lang: I18nContext.current().lang,
        }),
        text: this.i18n.t('translations.CHANGED_PASSWORD.TEXT', {
          lang: I18nContext.current().lang,
          args: {
            mail_sender: process.env.MAIL_SENDER,
          },
        }),
        view: 'password_changed',
      });

      return {
        success: true,
        message: this.i18n.t(
          'translations.CHANGED_PASSWORD.REQUEST_SUCCESSFULLY',
          {
            lang: I18nContext.current().lang,
          },
        ),
      };
    } catch (e) {
      throw new ServerError();
    }
  }

  async validateDecodedUser(decodedUser: TokenPayload): Promise<UserDto> {
    return await this.bookingManagersService.getManagerById(decodedUser.sub);
  }
}
