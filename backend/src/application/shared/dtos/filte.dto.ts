import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FileDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsOptional()
  url?: string;
}
