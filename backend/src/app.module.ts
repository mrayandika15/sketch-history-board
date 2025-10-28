import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SketchHistoryModule } from './modules/sketch-history/sketch-history.module';

@Module({
  imports: [SketchHistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
