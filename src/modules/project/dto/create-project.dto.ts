import { IsNotEmpty, IsOptional, IsArray, IsInt } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  sourceIds?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  consumerIds?: number[];
}
