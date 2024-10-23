import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { NestInterceptor, Type } from '@nestjs/common';
import * as fsExtra from 'fs-extra';
import * as fs from 'fs';

export class FileAdapter {
  private readonly UPLOAD_DIR = './uploads';

  saveFile(): MulterOptions {
    try {
      return {
        fileFilter: this.isImage,
        storage: diskStorage({
          destination: this.UPLOAD_DIR,
          filename: (req, file, cb) => {
            if (typeof file === 'string') return true;
            const extension = extname(file.originalname);
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const fileName = `${file.fieldname}-${uniqueSuffix}${extension}`;
            cb(null, fileName);
          },
        }),
      };
    } catch (error) {
      throw new Error('picture');
    }
  }

  async moveFile(sourcePath: string, destinationPath: string): Promise<string> {
    try {
      await fsExtra.move(sourcePath, destinationPath, { overwrite: true });
      return destinationPath;
    } catch (error) {
      throw new Error(`Error moving file: ${error.message}`);
    }
  }

  isImage(req: any, file: any, callback: any): any {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      req.fileValidationError = 'only image files allowed';
      return callback(null, false);
    }
    callback(null, true);
  }

  removeFile(filePath: string): void {
    fs.unlinkSync(filePath);
  }
}

export function FileInterceptorWithFallback(
  fieldName?: string,
): Type<NestInterceptor<any, any>> {
  return FileInterceptor(fieldName, new FileAdapter().saveFile());
}
