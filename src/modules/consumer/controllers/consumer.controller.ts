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
import { ConsumerService } from '../services/consumer.service';
import { CreateConsumerDto } from '../dto/create-consumer.dto';
import { UpdateConsumerDto } from '../dto/update-consumer.dto';
import { JwtAuthGuard } from '../../user/guards/jwt-auth.guard';
import { Consumer } from '../entities/consumer.entity';

@ApiTags('Consumers')
@ApiBearerAuth('JWT-auth')
@Controller('consumers')
@UseGuards(JwtAuthGuard)
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @Get()
  @ApiOperation({ summary: 'Get all consumers' })
  @ApiResponse({ status: 200, description: 'List of consumers' })
  async findAll(): Promise<Consumer[]> {
    return this.consumerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get consumer by ID' })
  @ApiResponse({ status: 200, description: 'Consumer found' })
  @ApiResponse({ status: 404, description: 'Consumer not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Consumer> {
    return this.consumerService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new consumer' })
  @ApiResponse({ status: 201, description: 'Consumer created' })
  @ApiResponse({
    status: 409,
    description: 'Consumer with this key already exists',
  })
  async create(
    @Body() createConsumerDto: CreateConsumerDto,
  ): Promise<Consumer> {
    return this.consumerService.create(createConsumerDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update consumer' })
  @ApiResponse({ status: 200, description: 'Consumer updated' })
  @ApiResponse({ status: 404, description: 'Consumer not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConsumerDto: UpdateConsumerDto,
  ): Promise<Consumer> {
    return this.consumerService.update(id, updateConsumerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete consumer' })
  @ApiResponse({ status: 200, description: 'Consumer deleted' })
  @ApiResponse({ status: 404, description: 'Consumer not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.consumerService.remove(id);
  }
}
