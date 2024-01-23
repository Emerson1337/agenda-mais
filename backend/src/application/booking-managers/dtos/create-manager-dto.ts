import { ManagersPlansEnum } from '@src/domain/entities/enums/managers-plans.enum';
import { ManagersRolesEnum } from '@src/domain/entities/enums/managers-roles.enum';
import { ManagerStatus } from '@src/domain/entities/enums/managers-status.enum';
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

export class CreateManagerDto {
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

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  status: ManagerStatus;

  @IsOptional()
  roles: ManagersRolesEnum[];

  @IsOptional()
  plan: ManagersPlansEnum;
}
