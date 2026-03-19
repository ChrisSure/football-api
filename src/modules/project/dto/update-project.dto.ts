import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsArray,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EntityStatus } from '../../../core/db/enums';

export class UpdateProjectDto {
  @ApiProperty({
    description: 'Project title',
    example: 'Premier League Data Aggregation',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({
    description: 'Project description',
    example: 'Updated description',
    required: false,
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Project status',
    enum: EntityStatus,
    example: EntityStatus.ACTIVE,
    required: false,
  })
  @IsOptional()
  @IsEnum(EntityStatus)
  status?: EntityStatus;

  @ApiProperty({
    description: 'Array of source IDs (replaces existing sources)',
    example: [2, 3, 4],
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  sourceIds?: number[];

  @ApiProperty({
    description: 'Array of consumer IDs (replaces existing consumers)',
    example: [1],
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  consumerIds?: number[];
}
