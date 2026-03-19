import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
}
