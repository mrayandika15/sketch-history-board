import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SketchHistoryModule } from './modules/sketch-history/sketch-history.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';

@Module({
  imports: [SketchHistoryModule, FileUploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
