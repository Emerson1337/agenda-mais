import { IsNotEmpty, IsString } from 'class-validator';

export class ForgotDto {
  @IsString({ message: 'O campo email deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo email não pode estar vazio.' })
  email: string;

  @IsString({ message: 'O campo recaptchaToken deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo recaptchaToken não pode estar vazio.' })
  recaptchaToken: string;
}
