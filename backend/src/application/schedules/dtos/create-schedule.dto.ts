import { IsDateFormat } from '@/application/shared/decorators/date-validator.decorator';
import { IsTimeFormat } from '@/application/shared/decorators/time-validator.decorator';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { IsArrayTimeFormat } from '@/application/shared/decorators/time-array-validator.decorator';

export class SchedulesTime {
  @IsNotEmpty({ message: 'O campo início não pode estar vazio.' })
  @IsTimeFormat({ message: 'O campo início deve estar no formato HH:MM.' })
  start: string;

  @IsNotEmpty({ message: 'O campo fim não pode estar vazio.' })
  @IsTimeFormat({ message: 'O campo fim deve estar no formato HH:MM.' })
  end: string;
}

export class SchedulesDateExceptions {
  @IsNotEmpty({ message: 'O campo data não pode estar vazio.' })
  @IsDateFormat({ message: 'O campo data deve estar no formato YYYY-MM-DD.' })
  date: string;

  @IsNotEmpty({ message: 'O campo horários não pode estar vazio.' })
  @IsArrayTimeFormat({ message: 'Cada horário deve estar no formato HH:MM.' })
  @ArrayMinSize(1, { message: 'O campo horários deve ter pelo menos 1 item.' })
  @ArrayMaxSize(24, {
    message: 'O campo horários deve ter no máximo 24 itens.',
  })
  times: string[];
}

export class CreateScheduleDto {
  @IsNotEmpty({ message: 'O campo managerId não pode estar vazio.' })
  @IsOptional()
  @IsMongoId({ message: 'O campo managerId deve ser um ID MongoDB válido.' })
  managerId: string;

  @IsNotEmpty({ message: 'O campo dias da semana não pode estar vazio.' })
  @ArrayMinSize(1, {
    message: 'O campo dias da semana deve ter pelo menos 1 item.',
  })
  @ArrayMaxSize(7, {
    message: 'O campo dias da semana deve ter no máximo 7 itens.',
  })
  @IsArray({ message: 'O campo dias da semana deve ser um array.' })
  @IsNumber(
    {},
    { each: true, message: 'Cada dia da semana deve ser um número.' },
  )
  weekDays: number[];

  @IsNotEmpty({ message: 'O campo intervalo de tempo não pode estar vazio.' })
  @ValidateNested({
    message: 'O campo intervalo de tempo deve ser um objeto válido.',
  })
  @Type(() => SchedulesTime)
  timeRange: SchedulesTime;

  @IsNotEmpty({ message: 'O campo horários não pode estar vazio.' })
  @IsArrayTimeFormat({ message: 'Cada horário deve estar no formato HH:MM.' })
  @ArrayMinSize(1, { message: 'O campo horários deve ter pelo menos 1 item.' })
  @ArrayMaxSize(24, {
    message: 'O campo horários deve ter no máximo 24 itens.',
  })
  @IsArray({ message: 'O campo horários deve ser um array.' })
  times: string[];

  @IsNotEmpty({ message: 'O campo meses à frente não pode estar vazio.' })
  @IsNumber({}, { message: 'O campo meses à frente deve ser um número.' })
  @Max(12, { message: 'O campo meses à frente deve ser no máximo 12.' })
  @Min(1, { message: 'O campo meses à frente deve ser no mínimo 1.' })
  monthsAhead: number;

  @IsNotEmpty({ message: 'O campo frequência não pode estar vazio.' })
  @IsNumber({}, { message: 'O campo frequência deve ser um número.' })
  @Max(120, { message: 'O campo frequência deve ser no máximo 120.' })
  @Min(15, { message: 'O campo frequência deve ser no mínimo 15.' })
  gapTimeInMinutes: number;

  @IsOptional()
  @ValidateNested({
    message: 'O campo exceções de datas deve ser um objeto válido.',
  })
  @Type(() => SchedulesDateExceptions)
  dateExceptions?: SchedulesDateExceptions[];
}
