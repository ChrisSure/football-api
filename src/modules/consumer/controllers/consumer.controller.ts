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
import { ConsumerService } from '../services/consumer.service';
import { CreateConsumerDto } from '../dto/create-consumer.dto';
import { UpdateConsumerDto } from '../dto/update-consumer.dto';
import { JwtAuthGuard } from '../../user/guards/jwt-auth.guard';
import { Consumer } from '../../../core/db/entities/consumer.entity';

@Controller('consumers')
@UseGuards(JwtAuthGuard)
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @Get()
  async findAll(): Promise<Consumer[]> {
    return this.consumerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Consumer> {
    return this.consumerService.findOne(id);
  }

  @Post()
  async create(
    @Body() createConsumerDto: CreateConsumerDto,
  ): Promise<Consumer> {
    return this.consumerService.create(createConsumerDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConsumerDto: UpdateConsumerDto,
  ): Promise<Consumer> {
    return this.consumerService.update(id, updateConsumerDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.consumerService.remove(id);
  }
}
