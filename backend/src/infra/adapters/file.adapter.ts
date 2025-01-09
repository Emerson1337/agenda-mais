import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { NestInterceptor, Type } from '@nestjs/common';
import * as fsExtra from 'fs-extra';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export class FileAdapter {
  private readonly UPLOAD_DIR = './uploads';
  private s3Client: S3Client;
  private bucket: string;
  private region: string;

  constructor() {
    this.s3Client = new S3Client({ region: process.env.AWS_REGION });
    this.region = process.env.AWS_REGION;
    this.bucket = process.env.S3_BUCKET;
  }

  ensureUploadDirExists(): void {
    if (!fs.existsSync(this.UPLOAD_DIR)) {
      fs.mkdirSync(this.UPLOAD_DIR, { recursive: true });
    }
  }

  saveFile(): MulterOptions {
    this.ensureUploadDirExists();
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

  async deleteFile(filePath: string): Promise<void> {
    try {
      await fsExtra.remove(filePath);
    } catch (error) {
      throw new Error(`Error deleting file: ${error.message}`);
    }
  }

  public async uploadFile({
    filePath,
    fileName,
    contentType,
  }: {
    filePath: string;
    fileName: string;
    contentType: string;
  }): Promise<{
    fileUrl: string;
  }> {
    if (!fileName)
      throw new Error(`File name is required for file: ${fileName}`);

    const file = fs.readFileSync(filePath);

    if (file.length > MAX_FILE_SIZE)
      throw new Error(`File size exceeds 10MB for file: ${fileName}`);

    try {
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
        Body: file,
        ContentType: contentType,
      });

      await this.s3Client.send(command);

      const fileUrl = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${fileName}`;
      return { fileUrl };
    } catch (error) {
      console.error('Failed to upload file to S3:', error);
      throw new Error('Error uploading file to S3.');
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
