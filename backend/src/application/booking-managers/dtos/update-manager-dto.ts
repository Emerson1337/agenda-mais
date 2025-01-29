import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ThemePalettesEnum } from '@/domain/entities/enums/theme-palettes.enum';
import { Transform } from 'class-transformer';

export class UpdateManagerDto {
  @IsString({ message: 'O campo mensagem de boas-vindas deve ser uma string.' })
  @IsOptional()
  @Transform((object) => (object === null ? undefined : object.value))
  welcomeMessage?: string;

  @IsString({ message: 'O campo nome de usuário deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo nome de usuário não pode estar vazio.' })
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
  @IsOptional()
  @Transform((object) => (object === null ? undefined : object.value))
  phone?: string;

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

  @IsOptional()
  palette: ThemePalettesEnum;
}
