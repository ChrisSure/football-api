import {IsNotEmpty, IsOptional, IsArray, IsInt, IsEnum} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {EntityStatus} from "../../../core/db/enums";

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
      description: 'Project status',
      enum: EntityStatus,
      example: EntityStatus.NEW,
      required: true,
    })
    @IsEnum(EntityStatus)
    status: EntityStatus;

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
