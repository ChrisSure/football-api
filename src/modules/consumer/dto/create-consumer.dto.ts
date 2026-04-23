import {IsEnum, IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {EntityStatus} from "../../../core/db/enums";

export class CreateConsumerDto {
  @ApiProperty({
    description: 'Consumer title',
    example: 'Web Dashboard',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Unique consumer key identifier',
    example: 'web_dashboard',
  })
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    description: 'Consumer status',
    enum: EntityStatus,
    example: EntityStatus.NEW,
    required: true,
  })
  @IsEnum(EntityStatus)
  status: EntityStatus;
}
