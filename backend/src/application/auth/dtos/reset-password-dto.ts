import { Match } from '@src/application/shared/decorators/match.decorator';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class ResetDto {
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @Match('password')
  confirmPassword: string;
}
