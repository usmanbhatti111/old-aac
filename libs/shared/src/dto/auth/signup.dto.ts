import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

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
    enum: ['SUPER_ADMIN', 'ORG_ADMIN', 'ORG_EMPLOYEE', 'ORG_REQUESTER'],
  })
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    example: '651e6368a3a6baf2f193efb0',
  })
  @IsMongoId()
  @IsOptional()
  company?: string;

  @ApiProperty({ type: Array, default: [] })
  @IsOptional()
  products?: [];

  @ApiProperty({ type: String })
  @IsOptional()
  crn?: string;

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
    required: false,
  })
  @IsOptional()
  numberOfEmployees: string;

  @ApiProperty({
    example: false,
    required: false,
  })
  @IsOptional()
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
