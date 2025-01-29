import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'O campo senha não pode estar vazio.' })
  password: string;

  @IsStrongPassword({}, { message: 'A nova senha deve ser forte.' })
  @IsNotEmpty({ message: 'O campo nova senha não pode estar vazio.' })
  newPassword: string;
}
