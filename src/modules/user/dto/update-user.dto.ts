import {
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsArray,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EntityStatus } from '../../../core/db/enums';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Username',
    example: 'john_doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User status',
    enum: EntityStatus,
    example: EntityStatus.ACTIVE,
    required: false,
  })
  @IsOptional()
  @IsEnum(EntityStatus)
  status?: EntityStatus;

  @ApiProperty({
    description: 'Array of project IDs to associate with user',
    example: [1, 2, 3],
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  projectIds?: number[];
}
