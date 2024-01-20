import { ManagerStatus } from '@src/domain/entities/enums/managers-status.enum';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsNumber,
  IsPositive,
  IsStrongPassword,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateUpdateManagerDto {
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

  @IsNotEmpty()
  @IsEnum(ManagerStatus)
  status: ManagerStatus;
}
