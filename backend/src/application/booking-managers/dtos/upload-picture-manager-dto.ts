import { FileDto } from '@/application/shared/dtos/file.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UploadPictureDto {
  @Type(() => FileDto)
  @IsNotEmpty({ message: 'O campo imagem não pode estar vazio.' })
  picture: FileDto;
}
