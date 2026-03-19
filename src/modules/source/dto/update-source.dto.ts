import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EntityStatus } from '../../../core/db/enums';

export class UpdateSourceDto {
  @ApiProperty({
    description: 'Source title',
    example: 'ESPN Football API',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({
    description: 'Source URL',
    example: 'https://api.espn.com/football/v2',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  url?: string;

  @ApiProperty({
    description: 'Unique source key identifier',
    example: 'espn_football_v2',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  key?: string;

  @ApiProperty({
    description: 'Source status',
    enum: EntityStatus,
    example: EntityStatus.ACTIVE,
    required: false,
  })
  @IsOptional()
  @IsEnum(EntityStatus)
  status?: EntityStatus;
}
