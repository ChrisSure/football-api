import {IsEnum, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {EntityStatus} from "../../../core/db/enums";

export class CreateSourceDto {
  @ApiProperty({
    description: 'Source title',
    example: 'ESPN Football API',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Source URL',
    example: 'https://api.espn.com/football',
  })
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'Unique source key identifier',
    example: 'espn_football',
  })
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    description: 'Source status',
    enum: EntityStatus,
    example: EntityStatus.ACTIVE,
    required: false,
  })
  @IsOptional()
  @IsEnum(EntityStatus)
  status?: EntityStatus;

  @ApiProperty({
    description: 'Project ID this source belongs to',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  projectId: number;
}
