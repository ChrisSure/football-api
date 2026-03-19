import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EntityStatus } from '../../../core/db/enums';

export class UpdateConsumerDto {
  @ApiProperty({
    description: 'Consumer title',
    example: 'Mobile App',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({
    description: 'Unique consumer key identifier',
    example: 'mobile_app',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  key?: string;

  @ApiProperty({
    description: 'Consumer status',
    enum: EntityStatus,
    example: EntityStatus.ACTIVE,
    required: false,
  })
  @IsOptional()
  @IsEnum(EntityStatus)
  status?: EntityStatus;
}
