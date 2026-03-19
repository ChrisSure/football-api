import { IsNotEmpty, IsOptional, IsEnum, IsInt } from 'class-validator';
import { ArticleStatus } from '../../../core/db/enums';

export class UpdateArticleDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus;

  @IsOptional()
  @IsInt()
  projectId?: number;

  @IsOptional()
  @IsInt()
  sourceId?: number;
}
