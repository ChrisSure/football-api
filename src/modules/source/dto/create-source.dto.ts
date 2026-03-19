import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSourceDto {
  @ApiProperty({
    description: 'Source title',
    example: 'ESPN Football API',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Source URL',
    example: 'https://api.espn.com/football',
  })
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'Unique source key identifier',
    example: 'espn_football',
  })
  @IsNotEmpty()
  key: string;
}
