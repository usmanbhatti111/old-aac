import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../schema/user-account';
import { UserRole } from '../../constants/enums';

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
    example: UserRole.SUPER_ADMIN,
    enum: UserRole,
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

  @ApiProperty({ type: Number })
  @IsOptional()
  crn?: number;

  @ApiProperty({ type: String })
  @IsOptional()
  companyName?: string;

  @ApiProperty({ type: Array, default: [] })
  @IsOptional()
  products?: [];

  organization: string;
}
