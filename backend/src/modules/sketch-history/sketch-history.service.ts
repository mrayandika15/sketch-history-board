import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service.js';
import { CreateSketchHistoryDto } from './dto/create-sketch-history.dto.js';

@Injectable()
export class SketchHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSketchHistoryDto) {
    const created = await this.prisma.sketchHistory.create({
      data: { name: dto.name, data: dto.data },
    });
    return created;
  }

  async deleteBulk(ids: number[]) {
    if (!ids?.length) return { count: 0 };
    const result = await this.prisma.sketchHistory.deleteMany({
      where: { id: { in: ids } },
    });
    return result;
  }

  async list() {
    return this.prisma.sketchHistory.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async detail(id: number) {
    const item = await this.prisma.sketchHistory.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Sketch history not found');
    return item;
  }
}