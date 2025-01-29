import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'O campo email deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo email não pode estar vazio.' })
  email: string;

  @IsString({ message: 'O campo password deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo password não pode estar vazio.' })
  password: string;
}

export interface ResetPasswordDto {
  password: string;
  resetToken: string;
}
