import { IsNotEmpty, IsOptional, IsEnum, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ArticleStatus } from '../../../core/db/enums';

export class UpdateArticleDto {
  @ApiProperty({
    description: 'Article title',
    example: 'Updated: Manchester United wins Premier League',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({
    description: 'Article image URL',
    example: 'https://example.com/updated-image.jpg',
    required: false,
  })
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Article status',
    enum: ArticleStatus,
    example: ArticleStatus.PUBLISHED,
    required: false,
  })
  @IsOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus;

  @ApiProperty({
    description: 'Project ID to reassign article to',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsInt()
  projectId?: number;

  @ApiProperty({
    description: 'Source ID to reassign article to',
    example: 3,
    required: false,
  })
  @IsOptional()
  @IsInt()
  sourceId?: number;
}
