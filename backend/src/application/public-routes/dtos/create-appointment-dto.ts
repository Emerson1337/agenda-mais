import { IsTimeFormat } from '@/application/shared/decorators/time-validator.decorator';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { IsDateFormat } from '@/application/shared/decorators/date-validator.decorator';

export class CreateAppointmentDto {
  @IsOptional()
  managerId?: string;

  serviceId: string;

  @IsOptional()
  code?: string;

  @IsString({ message: 'O campo nome do cliente deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo nome do cliente não pode estar vazio.' })
  clientName: string;

  @IsPhoneNumber(null, {
    message: 'O campo telefone deve ser um número de telefone válido.',
  })
  @IsNotEmpty({ message: 'O campo telefone não pode estar vazio.' })
  phone: string;

  @IsString({ message: 'O campo scheduleId deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo scheduleId não pode estar vazio.' })
  scheduleId: string;

  @IsTimeFormat({ message: 'O campo hora deve estar no formato HH:MM.' })
  @IsNotEmpty({ message: 'O campo hora não pode estar vazio.' })
  time: string;

  @IsDateFormat({ message: 'O campo data deve estar no formato YYYY-MM-DD.' })
  @IsNotEmpty({ message: 'O campo data não pode estar vazio.' })
  date: string;

  @IsString({ message: 'O campo notas deve ser uma string.' })
  @IsOptional()
  notes: string;
}
