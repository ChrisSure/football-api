import { IsNotEmpty, IsOptional, IsArray, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Project title',
    example: 'Premier League Data Aggregation',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Project description',
    example: 'Aggregates football data from multiple sources',
    required: false,
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Array of source IDs to associate with project',
    example: [1, 2, 3],
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  sourceIds?: number[];

  @ApiProperty({
    description: 'Array of consumer IDs to associate with project',
    example: [1, 2],
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  consumerIds?: number[];
}
