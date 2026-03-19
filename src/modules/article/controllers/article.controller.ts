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
import { ArticleService } from '../services/article.service';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { JwtAuthGuard } from '../../user/guards/jwt-auth.guard';
import { Article } from '../../../core/db/entities/article.entity';

@Controller('articles')
@UseGuards(JwtAuthGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return this.articleService.findOne(id);
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articleService.create(createArticleDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.articleService.remove(id);
  }
}
