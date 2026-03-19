import { IsNotEmpty } from 'class-validator';

export class CreateSourceDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  key: string;
}
