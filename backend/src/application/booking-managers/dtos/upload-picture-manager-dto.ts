import { FileDto } from '@src/application/shared/dtos/filte.dto';
import { Type } from 'class-transformer';

export class UploadPictureDto {
  @Type(() => FileDto)
  picture: FileDto;
}
