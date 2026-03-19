import { IsNotEmpty } from 'class-validator';

export class CreateConsumerDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  key: string;
}
