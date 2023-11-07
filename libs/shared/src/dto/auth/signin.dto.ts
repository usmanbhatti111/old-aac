import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    uniqueItems: true,
    example: 'test@example.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    minLength: 8,
    example: 'Test111@',
  })
  @IsNotEmpty()
  password: string;

  // Add timezone field in the future (already added in database)
}
