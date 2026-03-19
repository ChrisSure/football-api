import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsArray,
  IsInt,
} from 'class-validator';
import { EntityStatus } from '../../../core/db/enums';

export class UpdateProjectDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(EntityStatus)
  status?: EntityStatus;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  sourceIds?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  consumerIds?: number[];
}
