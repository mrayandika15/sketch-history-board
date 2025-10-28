import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { existsSync, mkdirSync } from 'fs';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

const ASSETS_DIR = path.resolve(process.cwd(), '../frontend/src/assets');

// Ensure destination exists at module load
if (!existsSync(ASSETS_DIR)) {
  mkdirSync(ASSETS_DIR, { recursive: true });
}

function sanitizeFilename(original: string): string {
  const ext = path.extname(original);
  const base = path.basename(original, ext).replace(/[^a-zA-Z0-9._-]/g, '_');
  return `${Date.now()}-${base}${ext}`;
}

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: ASSETS_DIR,
        filename: (_req, file, cb) =>
          cb(null, sanitizeFilename(file.originalname)),
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB default limit
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
