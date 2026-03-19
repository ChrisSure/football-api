import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { EntityStatus } from '../../../core/db/enums';

export class UpdateSourceDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  url?: string;

  @IsOptional()
  @IsNotEmpty()
  key?: string;

  @IsOptional()
  @IsEnum(EntityStatus)
  status?: EntityStatus;
}
