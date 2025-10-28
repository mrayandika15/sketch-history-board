import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { SketchHistoryService } from './sketch-history.service.js';
import { CreateSketchHistoryDto } from './dto/create-sketch-history.dto.js';
import { DeleteSketchHistoryDto } from './dto/delete-sketch-history.dto.js';

@Controller('sketch-history')
export class SketchHistoryController {
  constructor(private readonly service: SketchHistoryService) {}

  @Post()
  async create(@Body() dto: CreateSketchHistoryDto) {
    return this.service.create(dto);
  }

  @Delete()
  async deleteBulk(@Body() dto: DeleteSketchHistoryDto) {
    return this.service.deleteBulk(dto.ids);
  }

  @Get()
  async list() {
    return this.service.list();
  }

  @Get(':id')
  async detail(@Param('id') id: string) {
    return this.service.detail(Number(id));
  }
}