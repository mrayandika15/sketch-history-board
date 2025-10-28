import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { DeleteFileDto } from './dto/delete-file.dto';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly service: FileUploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: any) {
    if (!file) throw new BadRequestException('File is required');
    // Return a relative path under frontend
    return this.service.getRelativePath(file.filename);
  }

  @Delete()
  async delete(@Body() dto: DeleteFileDto) {
    await this.service.deleteByPath(dto.path);
    return { deleted: true };
  }
}