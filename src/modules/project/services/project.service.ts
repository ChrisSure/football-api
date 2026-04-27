import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Consumer } from '../../consumer/entities/consumer.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { EntityStatus } from '../../../core/db/enums';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Consumer)
    private readonly consumerRepository: Repository<Consumer>,
  ) {}

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({
      relations: ['sources', 'consumers'],
    });
  }

  async findAllActive(): Promise<Project[]> {
    return await this.projectRepository.find({
      where: { status: EntityStatus.ACTIVE },
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

    const consumers = await this.validateAndFetchConsumers(
      createProjectDto.consumerIds,
    );

    const project = this.projectRepository.create({
      title: createProjectDto.title,
      description: createProjectDto.description,
      status: createProjectDto.status,
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
