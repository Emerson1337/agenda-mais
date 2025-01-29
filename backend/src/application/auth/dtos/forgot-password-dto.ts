import { IsNotEmpty, IsString } from 'class-validator';

export class ForgotDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  recaptchaToken: string;
}
