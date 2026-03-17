import { IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { EntityStatus } from '../../../core/db/enums';

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEnum(EntityStatus)
  status?: EntityStatus;
}
