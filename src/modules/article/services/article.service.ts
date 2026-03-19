import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';
import { Project } from '../../project/entities/project.entity';
import { Source } from '../../source/entities/source.entity';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
  ) {}

  async findAll(): Promise<Article[]> {
    return await this.articleRepository.find({
      relations: ['project', 'source'],
    });
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['project', 'source'],
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return article;
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const project = await this.projectRepository.findOne({
      where: { id: createArticleDto.projectId },
    });

    if (!project) {
      throw new BadRequestException(
        `Project with ID ${createArticleDto.projectId} not found`,
      );
    }

    const source = await this.sourceRepository.findOne({
      where: { id: createArticleDto.sourceId },
    });

    if (!source) {
      throw new BadRequestException(
        `Source with ID ${createArticleDto.sourceId} not found`,
      );
    }

    const article = this.articleRepository.create({
      title: createArticleDto.title,
      image: createArticleDto.image,
      project,
      source,
    });

    return await this.articleRepository.save(article);
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['project', 'source'],
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    if (updateArticleDto.projectId) {
      const project = await this.projectRepository.findOne({
        where: { id: updateArticleDto.projectId },
      });

      if (!project) {
        throw new BadRequestException(
          `Project with ID ${updateArticleDto.projectId} not found`,
        );
      }

      article.project = project;
    }

    if (updateArticleDto.sourceId) {
      const source = await this.sourceRepository.findOne({
        where: { id: updateArticleDto.sourceId },
      });

      if (!source) {
        throw new BadRequestException(
          `Source with ID ${updateArticleDto.sourceId} not found`,
        );
      }

      article.source = source;
    }

    if (updateArticleDto.title !== undefined) {
      article.title = updateArticleDto.title;
    }

    if (updateArticleDto.image !== undefined) {
      article.image = updateArticleDto.image;
    }

    if (updateArticleDto.status !== undefined) {
      article.status = updateArticleDto.status;
    }

    return await this.articleRepository.save(article);
  }

  async remove(id: number): Promise<void> {
    const article = await this.articleRepository.findOne({ where: { id } });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    await this.articleRepository.remove(article);
  }
}
