import {
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsInt,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EntityStatus, UserRole } from '../../../core/db/enums';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username',
    example: 'john_doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User password',
    example: 'securePassword123',
  })
  @IsNotEmpty()
  password: string;

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

  @ApiProperty({
    description: 'User status',
    enum: EntityStatus,
    example: EntityStatus.NEW,
    required: true,
  })
  @IsEnum(EntityStatus)
  status: EntityStatus;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    example: UserRole.MODERATOR,
    required: true,
  })
  @IsEnum(UserRole)
  role: UserRole;
}
