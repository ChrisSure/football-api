import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumer } from '../../../core/db/entities/consumer.entity';
import { CreateConsumerDto } from '../dto/create-consumer.dto';
import { UpdateConsumerDto } from '../dto/update-consumer.dto';

@Injectable()
export class ConsumerService {
  constructor(
    @InjectRepository(Consumer)
    private readonly consumerRepository: Repository<Consumer>,
  ) {}

  async findAll(): Promise<Consumer[]> {
    return await this.consumerRepository.find();
  }

  async findOne(id: number): Promise<Consumer> {
    const consumer = await this.consumerRepository.findOne({ where: { id } });

    if (!consumer) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }

    return consumer;
  }

  async create(createConsumerDto: CreateConsumerDto): Promise<Consumer> {
    const existingConsumer = await this.consumerRepository.findOne({
      where: { key: createConsumerDto.key },
    });

    if (existingConsumer) {
      throw new ConflictException('Consumer with this key already exists');
    }

    const consumer = this.consumerRepository.create(createConsumerDto);

    return await this.consumerRepository.save(consumer);
  }

  async update(
    id: number,
    updateConsumerDto: UpdateConsumerDto,
  ): Promise<Consumer> {
    const consumer = await this.consumerRepository.findOne({ where: { id } });

    if (!consumer) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }

    if (updateConsumerDto.key && updateConsumerDto.key !== consumer.key) {
      const existingConsumer = await this.consumerRepository.findOne({
        where: { key: updateConsumerDto.key },
      });

      if (existingConsumer) {
        throw new ConflictException('Consumer with this key already exists');
      }
    }

    Object.assign(consumer, updateConsumerDto);
    return await this.consumerRepository.save(consumer);
  }

  async remove(id: number): Promise<void> {
    const consumer = await this.consumerRepository.findOne({ where: { id } });

    if (!consumer) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }

    await this.consumerRepository.remove(consumer);
  }
}
