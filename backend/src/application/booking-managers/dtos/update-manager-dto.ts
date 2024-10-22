import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ThemePalettesEnum } from '@/domain/entities/enums/theme-palettes.enum';

export class UpdateManagerDto {
  @IsString()
  @IsOptional()
  @Transform((object) => (object === null ? undefined : object.value))
  welcomeMessage?: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @Transform((object) => (object === null ? undefined : object.value))
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  @Transform((object) => (object === null ? undefined : object.value))
  profilePhoto?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform((object) => (object === null ? undefined : object.value))
  appointmentsPerPhone?: number;

  @IsOptional()
  @IsEnum(ThemePalettesEnum)
  palette: ThemePalettesEnum;
}
