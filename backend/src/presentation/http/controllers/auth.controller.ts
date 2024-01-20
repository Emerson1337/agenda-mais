import {
  // BadRequestException,
  Body,
  Controller,
  // Delete,
  // Get,
  Post,
  // Res,
  // UseGuards,
} from '@nestjs/common';
import { AuthService } from '@src/application/auth/auth.service';
import { LoginDto } from '@src/application/auth/dtos/login-dto';
// import { User } from '../../user/schema/user.schema';
// import { UserService } from '../../user/service/user.service';
// import { CurrentUser } from '../decorators/current-user.decorator';
// import { AuthService } from '../service/auth.service';
// import { JwtAuthGuard } from '../guard/jwt-auth.guard';
// import { RegisterDto } from '../dto/register.dto';
// import { LoginDto } from '../dto/login.dto';
// import { FacebookAuthService } from 'facebook-auth-nestjs';
// import { GoogleAuthService } from '../service/google-auth.service';
// import { AppleAuthService } from '../service/apple-auth.service';
// import { AppleLoginDto } from '../dto/apple-login.dto';
// import { Dictionary } from 'code-config';
// import { Response } from 'express';
// import { authConfig } from '../config/auth.config';
// import { stringify } from 'qs';
// import { SubscriptionService } from '../../user/service/subscription.service';
// import { AuthNotRequired } from '../decorators/auth-not-required.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    // private userService: UserService,
    // private googleService: GoogleAuthService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(
      await this.authService.validate(body.email, body.password),
    );
  }

  // @Post('google-login')
  // @AuthNotRequired()
  // @UseGuards(JwtAuthGuard)
  // async googleLogin(
  //   @CurrentUser() user: User,
  //   @Body('accessToken') accessToken: string,
  // ) {
  //   return this.authService.loginWithThirdParty(
  //     'googleId',
  //     () => this.googleService.getUser(accessToken),
  //     user,
  //   );
  // }

  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.loginWithRefreshToken(refreshToken);
  }

  // @Get('me')
  // @UseGuards(JwtAuthGuard)
  // me(@CurrentUser() user: User) {
  //   return this.userService.filterUser(user, ['email']);
  // }
}
