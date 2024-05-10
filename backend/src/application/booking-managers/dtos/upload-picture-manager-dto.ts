import { FileDto } from '@/application/shared/dtos/file.dto';
import { Type } from 'class-transformer';

export class UploadPictureDto {
  @Type(() => FileDto)
  picture: FileDto;
}
