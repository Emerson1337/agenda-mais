import { Body, Controller, Post, Query, Res } from '@nestjs/common';
import { AuthService } from '@/application/auth/auth.service';
import { ForgotDto } from '@/application/auth/dtos/forgot-password-dto';
import { LoginDto } from '@/application/auth/dtos/login-dto';
import { ResetDto } from '@/application/auth/dtos/reset-password-dto';
import { handleError, ok } from '@/presentation/helpers/http.helper';
import { Response } from 'express';
import { SignUpDto } from '@/application/auth/dtos/signup-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('cadastrar')
  async create(@Body() manager: SignUpDto, @Res() response: Response) {
    try {
      return response
        .status(200)
        .send(ok(await this.authService.create(manager)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Post('login')
  async login(@Body() body: LoginDto, @Res() response: Response) {
    try {
      return response.status(200).send(
        ok(
          await this.authService.login(
            await this.authService.validate({
              email: body.email,
              password: body.password,
            }),
          ),
        ),
      );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Post('esqueci-senha')
  async forgotPassword(@Body() body: ForgotDto, @Res() response: Response) {
    try {
      return response
        .status(200)
        .send(ok(await this.authService.forgotPassword(body.email)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Post('resetar-senha')
  async resetPassword(
    @Body() body: ResetDto,
    @Query() query: { token: string },
    @Res() response: Response,
  ) {
    try {
      return response.status(200).send(
        ok(
          await this.authService.resetPassword({
            password: body.password,
            resetToken: query.token,
          }),
        ),
      );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Post('refresh-token')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
    @Res() response: Response,
  ) {
    try {
      return response
        .status(200)
        .send(ok(await this.authService.loginWithRefreshToken(refreshToken)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Post('verify-token')
  async verifyToken(@Body('token') token: string, @Res() response: Response) {
    try {
      return response
        .status(200)
        .send(ok(await this.authService.verifyToken(token)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }
}
