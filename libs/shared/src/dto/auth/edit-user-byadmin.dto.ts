import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserRole, UserStatus } from '../../constants/enums';

export class EditUserByAdminDto {
  @ApiProperty({
    required: false,
    example: '',
    enum: UserRole,
  })
  @IsOptional()
  role: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    type: Object,
    example: {
      flatNumber: 'string', // alt: unit
      buildingName: 'string',
      buildingNumber: 'string',
      streetName: 'string',
      city: 'string', // alt: town
      country: 'string',
      composite: 'string',
    },
  })
  @IsOptional()
  address?: {};

  @ApiProperty({ type: String, example: 'Manager' })
  @IsOptional()
  jobTitle: string;

  @ApiProperty({ type: String, example: 'https://www.facebook.com/user' })
  @IsOptional()
  facebookUrl?: string;

  @ApiProperty({ type: String, example: 'https://www.linkdin.com/user' })
  @IsOptional()
  linkedInUrl?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  crn?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    required: false,
    example: [],
  })
  @IsOptional()
  products?: string[];

  @ApiProperty({
    required: false,
    example: UserStatus.ACTIVE,
    enum: UserStatus,
  })
  @IsOptional()
  status?: string;

  userId: string;
}
