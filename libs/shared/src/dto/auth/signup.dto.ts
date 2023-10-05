import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    required: true,
    example: 'Doe',
  })
  @IsNotEmpty()
  lastName: string;

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
}
