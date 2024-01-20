import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user-dto';
import { TokenPayload, TokenResponse } from './dtos/token-dto';
import { TokenAdapter } from '@src/infra/adapters/token.adapter';
import { BookingManagersService } from '../booking-managers/booking-managers.service';
import { EncryptAdapter } from '@src/infra/adapters/encrypt.adapter';
import { UnauthorizedError } from '@src/presentation/errors/unauthorized-error';

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
      permission: 'static',
    };

    const refresh_token = await this.tokenService.generateToken(
      payload,
      'refreshToken',
    );

    return {
      access_token: await this.tokenService.generateToken(payload),
      refresh_token,
    };
  }

  // async loginWithThirdParty(
  //   fieldId: keyof UserDto,
  //   getSocialUserDto: GetSocialUserDtoHandler,
  //   currentUserDto?: UserDto,
  //   customName?: string,
  // ) {
  //   try {
  //     const { name, email, id } = await getSocialUserDto();

  //     const existentUserDto = await this.bookingManagersService.getUserDtoBy({
  //       [fieldId]: id,
  //     });

  //     if (existentUserDto && !currentUserDto) {
  //       return this.login(existentUserDto);
  //     }

  //     if (existentUserDto && currentUserDto) {
  //       throw new BadRequestException(`${fieldId} already exists`);
  //     }

  //     if (
  //       !currentUserDto &&
  //       (await this.bookingManagersService.getUserDtoByEmail(email))
  //     ) {
  //       throw new BadRequestException('Email already exists');
  //     }

  //     if (currentUserDto) {
  //       currentUserDto[fieldId as string] = id;
  //       await currentUserDto.save();

  //       return this.login(currentUserDto);
  //     }

  //     const username = await this.bookingManagersService.generateUserDtoname(
  //       customName || name,
  //     );

  //     const user = await this.bookingManagersService.create({
  //       username,
  //       email,
  //       [fieldId]: id,
  //     });

  //     return this.login(user);
  //   } catch (e) {
  //     if (e instanceof HttpException) {
  //       throw e;
  //     }

  //     throw new UnauthorizedException('Invalid access token');
  //   }
  // }

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

  async validateDecodedUser(decodedUser: TokenPayload) {
    return await this.bookingManagersService.getManagerById(decodedUser.sub);
  }
}
