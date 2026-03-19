import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { SourceService } from '../services/source.service';
import { CreateSourceDto } from '../dto/create-source.dto';
import { UpdateSourceDto } from '../dto/update-source.dto';
import { JwtAuthGuard } from '../../user/guards/jwt-auth.guard';
import { Source } from '../entities/source.entity';

@Controller('sources')
@UseGuards(JwtAuthGuard)
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @Get()
  async findAll(): Promise<Source[]> {
    return this.sourceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Source> {
    return this.sourceService.findOne(id);
  }

  @Post()
  async create(@Body() createSourceDto: CreateSourceDto): Promise<Source> {
    return this.sourceService.create(createSourceDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSourceDto: UpdateSourceDto,
  ): Promise<Source> {
    return this.sourceService.update(id, updateSourceDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.sourceService.remove(id);
  }
}
