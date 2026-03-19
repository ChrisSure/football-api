import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Source } from '../../source/entities/source.entity';
import { Consumer } from '../../consumer/entities/consumer.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
    @InjectRepository(Consumer)
    private readonly consumerRepository: Repository<Consumer>,
  ) {}

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({
      relations: ['sources', 'consumers'],
    });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['sources', 'consumers'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const existingProject = await this.projectRepository.findOne({
      where: { title: createProjectDto.title },
    });

    if (existingProject) {
      throw new ConflictException('Project with this title already exists');
    }

    const sources = await this.validateAndFetchSources(
      createProjectDto.sourceIds,
    );
    const consumers = await this.validateAndFetchConsumers(
      createProjectDto.consumerIds,
    );

    const project = this.projectRepository.create({
      title: createProjectDto.title,
      description: createProjectDto.description,
      sources,
      consumers,
    });

    return await this.projectRepository.save(project);
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['sources', 'consumers'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    await this.validateTitleUniqueness(updateProjectDto.title, project.title);
    await this.updateProjectSources(project, updateProjectDto.sourceIds);
    await this.updateProjectConsumers(project, updateProjectDto.consumerIds);

    if (updateProjectDto.title) project.title = updateProjectDto.title;
    if (updateProjectDto.description !== undefined)
      project.description = updateProjectDto.description;
    if (updateProjectDto.status) project.status = updateProjectDto.status;

    return await this.projectRepository.save(project);
  }

  async remove(id: number): Promise<void> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['sources', 'consumers'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    await this.projectRepository.remove(project);
  }

  private async validateAndFetchSources(
    sourceIds?: number[],
  ): Promise<Source[]> {
    if (!sourceIds || sourceIds.length === 0) {
      return [];
    }

    const sources = await this.sourceRepository.find({
      where: { id: In(sourceIds) },
    });

    if (sources.length !== sourceIds.length) {
      throw new BadRequestException('One or more source IDs are invalid');
    }

    return sources;
  }

  private async validateTitleUniqueness(
    newTitle?: string,
    currentTitle?: string,
  ): Promise<void> {
    if (newTitle && newTitle !== currentTitle) {
      const existingProject = await this.projectRepository.findOne({
        where: { title: newTitle },
      });

      if (existingProject) {
        throw new ConflictException('Project with this title already exists');
      }
    }
  }

  private async validateAndFetchConsumers(
    consumerIds?: number[],
  ): Promise<Consumer[]> {
    if (!consumerIds || consumerIds.length === 0) {
      return [];
    }

    const consumers = await this.consumerRepository.find({
      where: { id: In(consumerIds) },
    });

    if (consumers.length !== consumerIds.length) {
      throw new BadRequestException('One or more consumer IDs are invalid');
    }

    return consumers;
  }

  private async updateProjectSources(
    project: Project,
    sourceIds?: number[],
  ): Promise<void> {
    if (sourceIds !== undefined) {
      if (sourceIds.length > 0) {
        project.sources = await this.validateAndFetchSources(sourceIds);
      } else {
        project.sources = [];
      }
    }
  }

  private async updateProjectConsumers(
    project: Project,
    consumerIds?: number[],
  ): Promise<void> {
    if (consumerIds !== undefined) {
      if (consumerIds.length > 0) {
        project.consumers = await this.validateAndFetchConsumers(consumerIds);
      } else {
        project.consumers = [];
      }
    }
  }
}
