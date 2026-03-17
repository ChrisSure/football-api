import {
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsArray,
  IsInt,
} from 'class-validator';
import { EntityStatus } from '../../../core/db/enums';

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEnum(EntityStatus)
  status?: EntityStatus;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  projectIds?: number[];
}
