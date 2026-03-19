import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  image?: string;

  @IsNotEmpty()
  @IsInt()
  projectId: number;

  @IsNotEmpty()
  @IsInt()
  sourceId: number;
}
