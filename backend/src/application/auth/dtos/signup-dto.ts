import { IsValidUsername } from '@/application/shared/decorators/username-validator.decorator';
import { ManagersPlansEnum } from '@/domain/entities/enums/managers-plans.enum';
import { ManagersRolesEnum } from '@/domain/entities/enums/managers-roles.enum';
import { ManagerStatus } from '@/domain/entities/enums/managers-status.enum';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ThemePalettesEnum } from '@/domain/entities/enums/theme-palettes.enum';

export class SignUpDto {
  @IsString({ message: 'O campo mensagem de boas-vindas deve ser uma string.' })
  @IsOptional()
  @Transform((object) => (object === null ? undefined : object.value))
  welcomeMessage?: string;

  @IsString({ message: 'O campo nome de usuário deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo nome de usuário não pode estar vazio.' })
  @IsValidUsername({ message: 'O nome de usuário não é válido.' })
  username: string;

  @IsString({ message: 'O campo primeiro nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo primeiro nome não pode estar vazio.' })
  firstName: string;

  @IsString({ message: 'O campo sobrenome deve ser uma string.' })
  @IsOptional()
  @Transform((object) => (object === null ? undefined : object.value))
  lastName?: string;

  @IsEmail({}, { message: 'O campo email deve ser um email válido.' })
  @IsNotEmpty({ message: 'O campo email não pode estar vazio.' })
  email: string;

  @IsPhoneNumber(null, {
    message: 'O campo telefone deve ser um número de telefone válido.',
  })
  @IsNotEmpty({ message: 'O campo telefone não pode estar vazio.' })
  phone: string;

  @IsString({ message: 'O campo foto de perfil deve ser uma string.' })
  @IsOptional()
  @Transform((object) => (object === null ? undefined : object.value))
  profilePhoto?: string;

  @IsNumber(
    {},
    { message: 'O campo compromissos por telefone deve ser um número.' },
  )
  @IsPositive({
    message: 'O campo compromissos por telefone deve ser um número positivo.',
  })
  @IsOptional()
  @Transform((object) => (object === null ? undefined : object.value))
  appointmentsPerPhone?: number;

  @IsStrongPassword({}, { message: 'A senha deve ser forte.' })
  @IsNotEmpty({ message: 'O campo senha não pode estar vazio.' })
  password: string;

  @IsOptional()
  status: ManagerStatus;

  @IsOptional()
  roles: ManagersRolesEnum[];

  @IsOptional()
  plan: ManagersPlansEnum;

  @IsOptional()
  palette: ThemePalettesEnum;

  @IsString({ message: 'O campo token do reCAPTCHA deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo token do reCAPTCHA não pode estar vazio.' })
  recaptchaToken: string;
}
