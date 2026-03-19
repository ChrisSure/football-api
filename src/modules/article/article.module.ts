import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Project } from '../project/entities/project.entity';
import { Source } from '../source/entities/source.entity';
import { ArticleController } from './controllers/article.controller';
import { ArticleService } from './services/article.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Project, Source])],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
