import { Module } from '@nestjs/common';
import { SketchHistoryController } from './sketch-history.controller';
import { SketchHistoryService } from './sketch-history.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [SketchHistoryController],
  providers: [SketchHistoryService, PrismaService],
})
export class SketchHistoryModule {}