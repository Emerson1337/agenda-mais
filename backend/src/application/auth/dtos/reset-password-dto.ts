import { Match } from '@/application/shared/decorators/match.decorator';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class ResetDto {
  @IsString({ message: 'O campo senha deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo senha não pode estar vazio.' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    },
    {
      message:
        'A senha deve ter no mínimo 8 caracteres, e pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.',
    },
  )
  password: string;

  @IsString({ message: 'O campo confirmar senha deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo confirmar senha não pode estar vazio.' })
  @IsStrongPassword({}, { message: 'A confirmação da senha deve ser forte.' })
  @Match('password', { message: 'As senhas não coincidem.' })
  confirmPassword: string;

  @IsString({ message: 'O campo token deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo token não pode estar vazio.' })
  token: string;
}
