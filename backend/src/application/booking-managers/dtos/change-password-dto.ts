import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  password: string;

  @IsStrongPassword()
  @IsNotEmpty()
  newPassword: string;
}
