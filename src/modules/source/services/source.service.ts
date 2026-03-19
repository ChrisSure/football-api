import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Source } from '../entities/source.entity';
import { CreateSourceDto } from '../dto/create-source.dto';
import { UpdateSourceDto } from '../dto/update-source.dto';

@Injectable()
export class SourceService {
  constructor(
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
  ) {}

  async findAll(): Promise<Source[]> {
    return await this.sourceRepository.find();
  }

  async findOne(id: number): Promise<Source> {
    const source = await this.sourceRepository.findOne({ where: { id } });

    if (!source) {
      throw new NotFoundException(`Source with ID ${id} not found`);
    }

    return source;
  }

  async create(createSourceDto: CreateSourceDto): Promise<Source> {
    const existingSource = await this.sourceRepository.findOne({
      where: { key: createSourceDto.key },
    });

    if (existingSource) {
      throw new ConflictException('Source with this key already exists');
    }

    const source = this.sourceRepository.create(createSourceDto);

    return await this.sourceRepository.save(source);
  }

  async update(id: number, updateSourceDto: UpdateSourceDto): Promise<Source> {
    const source = await this.sourceRepository.findOne({ where: { id } });

    if (!source) {
      throw new NotFoundException(`Source with ID ${id} not found`);
    }

    if (updateSourceDto.key && updateSourceDto.key !== source.key) {
      const existingSource = await this.sourceRepository.findOne({
        where: { key: updateSourceDto.key },
      });

      if (existingSource) {
        throw new ConflictException('Source with this key already exists');
      }
    }

    Object.assign(source, updateSourceDto);
    return await this.sourceRepository.save(source);
  }

  async remove(id: number): Promise<void> {
    const source = await this.sourceRepository.findOne({ where: { id } });

    if (!source) {
      throw new NotFoundException(`Source with ID ${id} not found`);
    }

    await this.sourceRepository.remove(source);
  }
}
