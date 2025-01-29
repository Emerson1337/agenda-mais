import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { AppointmentStatus } from '@/domain/entities/enums/appointment-status.enum';
import { IsDateFormat } from '@/application/shared/decorators/date-validator.decorator';
import { IsTimeFormat } from '@/application/shared/decorators/time-validator.decorator';

export class CreateOrUpdateSalesReportDto {
  @IsString({ message: 'O campo managerId deve ser uma string.' })
  @IsMongoId({ message: 'O campo managerId deve ser um ID MongoDB válido.' })
  managerId: string;

  @IsNumber({}, { message: 'O campo preço deve ser um número.' })
  price: number;

  @IsDateFormat({ message: 'O campo data deve estar no formato YYYY-MM-DD.' })
  date: string;

  @IsTimeFormat({ message: 'O campo hora deve estar no formato HH:MM.' })
  time: string;

  @IsPhoneNumber(null, {
    message: 'O campo telefone deve ser um número de telefone válido.',
  })
  phone: string;

  @IsNotEmpty({ message: 'O campo nome do cliente não pode estar vazio.' })
  clientName: string;

  @IsNotEmpty({ message: 'O campo código não pode estar vazio.' })
  code: string;

  @IsNotEmpty({ message: 'O campo nome do serviço não pode estar vazio.' })
  serviceName: string;

  @IsNotEmpty({ message: 'O campo notas não pode estar vazio.' })
  notes: string;

  @IsOptional()
  @IsNumber({}, { message: 'O campo duração em minutos deve ser um número.' })
  timeDurationInMinutes?: number;

  @IsOptional()
  @IsEnum(AppointmentStatus, {
    message: 'O campo status deve ser um valor válido.',
  })
  status?: AppointmentStatus;
}
