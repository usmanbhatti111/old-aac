import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../schema/user-account';

export class CreateUserDto extends User {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String })
  @IsOptional()
  middleName?: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'SUPER_ADMIN',
    enum: ['SUPER_ADMIN', 'ORG_ADMIN'],
  })
  @IsNotEmpty()
  role: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  phoneNumber?: string;

  @ApiProperty({ type: String })
  postCode?: string;

  @ApiProperty({
    type: Object,
    example: {
      flatNumber: 'string', // alt: unit
      buildingName: 'string',
      streetName: 'string',
      city: 'string', // alt: town
      country: 'string',
    },
  })
  @IsOptional()
  address?: {};

  @ApiProperty({ type: String })
  @IsOptional()
  jobTitle: string;

  @ApiProperty({ type: String })
  @IsOptional()
  facebookUrl?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  linkedInUrl?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  crn?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  companyName?: string;

  @ApiProperty({ type: Array, default: [] })
  @IsOptional()
  products?: [];
}
