import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'ORG_ADMIN',
    enum: ['SUPER_ADMIN', 'ORG_ADMIN'],
  })
  @IsNotEmpty()
  role: string;

  @ApiProperty({ type: Array, default: [] })
  @IsOptional()
  products?: [];

  @ApiProperty({ type: Number })
  @IsOptional()
  crn?: number;

  @ApiProperty({
    uniqueItems: true,
    example: 'test@example.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    uniqueItems: true,
    example: '+44 2388 2399',
  })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: '100-200',
  })
  @IsNotEmpty()
  numberOfEmployees: string;

  @ApiProperty({
    example: false,
  })
  @IsNotEmpty()
  enableEmployeeVerification: boolean;

  @ApiProperty({
    minLength: 8,
    example: 'Test111@',
  })
  @IsNotEmpty()
  password: string;

  organization?: string;
  cognitoId?: string;
}

export class ForceConfirmDto {
  @ApiProperty({
    uniqueItems: true,
    example: 'test@example.com',
  })
  @IsNotEmpty()
  email: string;
}
