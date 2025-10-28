import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import { access, unlink } from 'fs/promises';

@Injectable()
export class FileUploadService {
  private readonly assetsBase = path.resolve(process.cwd(), '../frontend/src/assets');

  getRelativePath(filename: string): string {
    // Return path relative to frontend root for clarity
    return `src/assets/${filename}`;
  }

  async deleteByPath(p: string): Promise<void> {
    const filename = path.basename(p);
    const absolute = path.join(this.assetsBase, filename);
    try {
      await access(absolute);
    } catch {
      throw new NotFoundException('File not found');
    }
    await unlink(absolute);
  }
}