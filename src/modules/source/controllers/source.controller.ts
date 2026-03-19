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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SourceService } from '../services/source.service';
import { CreateSourceDto } from '../dto/create-source.dto';
import { UpdateSourceDto } from '../dto/update-source.dto';
import { JwtAuthGuard } from '../../user/guards/jwt-auth.guard';
import { Source } from '../entities/source.entity';

@ApiTags('Sources')
@ApiBearerAuth('JWT-auth')
@Controller('sources')
@UseGuards(JwtAuthGuard)
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sources' })
  @ApiResponse({ status: 200, description: 'List of sources' })
  async findAll(): Promise<Source[]> {
    return this.sourceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get source by ID' })
  @ApiResponse({ status: 200, description: 'Source found' })
  @ApiResponse({ status: 404, description: 'Source not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Source> {
    return this.sourceService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new source' })
  @ApiResponse({ status: 201, description: 'Source created' })
  @ApiResponse({
    status: 409,
    description: 'Source with this key already exists',
  })
  async create(@Body() createSourceDto: CreateSourceDto): Promise<Source> {
    return this.sourceService.create(createSourceDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update source' })
  @ApiResponse({ status: 200, description: 'Source updated' })
  @ApiResponse({ status: 404, description: 'Source not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSourceDto: UpdateSourceDto,
  ): Promise<Source> {
    return this.sourceService.update(id, updateSourceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete source' })
  @ApiResponse({ status: 200, description: 'Source deleted' })
  @ApiResponse({ status: 404, description: 'Source not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.sourceService.remove(id);
  }
}
