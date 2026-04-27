import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Source } from '../entities/source.entity';
import { Project } from '../../project/entities/project.entity';
import { CreateSourceDto } from '../dto/create-source.dto';
import { UpdateSourceDto } from '../dto/update-source.dto';

@Injectable()
export class SourceService {
  constructor(
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Source[]> {
    return await this.sourceRepository.find({ relations: ['project'] });
  }

  async findOne(id: number): Promise<Source> {
    const source = await this.sourceRepository.findOne({
      where: { id },
      relations: ['project'],
    });

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

    const project = await this.projectRepository.findOne({
      where: { id: createSourceDto.projectId },
    });

    if (!project) {
      throw new NotFoundException(
        `Project with ID ${createSourceDto.projectId} not found`,
      );
    }

    const source = this.sourceRepository.create({
      ...createSourceDto,
      project,
    });

    return await this.sourceRepository.save(source);
  }

  async update(id: number, updateSourceDto: UpdateSourceDto): Promise<Source> {
    const source = await this.sourceRepository.findOne({
      where: { id },
      relations: ['project'],
    });

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

    if (
      updateSourceDto.projectId &&
      updateSourceDto.projectId !== source.projectId
    ) {
      const project = await this.projectRepository.findOne({
        where: { id: updateSourceDto.projectId },
      });

      if (!project) {
        throw new NotFoundException(
          `Project with ID ${updateSourceDto.projectId} not found`,
        );
      }
      source.project = project;
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
