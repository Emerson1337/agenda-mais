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

export class CreateManagerDto {
  @IsString()
  @IsOptional()
  @Transform((object) => (object === null ? undefined : object.value))
  welcomeMessage?: string;

  @IsString()
  @IsNotEmpty()
  @IsValidUsername()
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

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  status: ManagerStatus;

  @IsOptional()
  roles: ManagersRolesEnum[];

  @IsOptional()
  plan: ManagersPlansEnum;

  @IsOptional()
  palette: ThemePalettesEnum;
}
