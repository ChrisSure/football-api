import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { EntityStatus } from '../../../core/db/enums';

export class UpdateProjectDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(EntityStatus)
  status?: EntityStatus;
}
