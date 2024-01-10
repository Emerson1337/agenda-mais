import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MissingParamError } from '../../../presentation/errors';
import { FileInterceptor } from '@nestjs/platform-express';
import { NestInterceptor, Type } from '@nestjs/common';

export class FileAdapter {
  saveFile(): MulterOptions {
    try {
      return {
        fileFilter: this.isImage,
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const extension = extname(file.originalname);
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const fileName = `${file.fieldname}-${uniqueSuffix}${extension}`;
            cb(null, fileName);
          },
        }),
      };
    } catch (error) {
      console.log('entrei');
      throw new MissingParamError('picture');
    }
  }

  isImage(req: any, file: any, callback: any): any {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      req.fileValidationError = 'only image files allowed';
      return callback(null, false);
    }
    callback(null, true);
  }
}

export function FileInterceptorWithFallback(
  fieldName?: string,
): Type<NestInterceptor<any, any>> {
  return FileInterceptor(fieldName, new FileAdapter().saveFile());
}
