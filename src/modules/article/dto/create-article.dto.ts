import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({
    description: 'Article title',
    example: 'Manchester United wins Premier League',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Article image URL',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Project ID this article belongs to',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  projectId: number;

  @ApiProperty({
    description: 'Source ID where this article came from',
    example: 2,
  })
  @IsNotEmpty()
  @IsInt()
  sourceId: number;
}
