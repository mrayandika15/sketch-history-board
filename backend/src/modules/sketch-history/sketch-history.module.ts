import { Module } from '@nestjs/common';
import { SketchHistoryController } from './sketch-history.controller.js';
import { SketchHistoryService } from './sketch-history.service.js';
import { PrismaService } from '../../common/prisma.service.js';

@Module({
  controllers: [SketchHistoryController],
  providers: [SketchHistoryService, PrismaService],
})
export class SketchHistoryModule {}