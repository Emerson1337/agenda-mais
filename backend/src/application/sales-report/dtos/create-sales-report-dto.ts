import {
  IsDate,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateSalesReportDto {
  @IsString()
  @IsMongoId()
  managerId: string;

  @IsNumber()
  price: number;

  @IsDate()
  dateSelected: Date;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsMongoId()
  appointmentId: string;

  @IsOptional()
  timeDuration?: string;
}
