import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'New password for the user',
    example: 'newSecurePassword456',
  })
  @IsNotEmpty()
  newPassword: string;
}
