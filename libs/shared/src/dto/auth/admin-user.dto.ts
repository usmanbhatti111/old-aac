import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../schema/user-account';
import { UserRole } from '../../constants/enums';

export class CreateUserDto extends User {
  @ApiProperty({ type: String, example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String, example: 'Smith' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: UserRole.SUPER_ADMIN,
    enum: UserRole,
  })
  @IsNotEmpty()
  role: string;

  @ApiProperty({ type: String, example: 'text@example.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, example: '+44 23882323' })
  phoneNumber?: string;

  @ApiProperty({ type: String, example: 'SA135' })
  postCode?: string;

  @ApiProperty({
    type: Object,
    example: {
      flatNumber: 'string', // alt: unit
      buildingName: 'string',
      buildingNumber: 'string',
      streetName: 'string',
      city: 'string', // alt: town
      country: 'string',
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

  @ApiProperty({ type: Number, example: '21399249' })
  @IsOptional()
  crn?: number;

  @ApiProperty({ type: String, example: 'Orcalo Ltd' })
  @IsOptional()
  companyName?: string;

  @ApiProperty({ type: Array, default: [] })
  @IsOptional()
  products?: [];

  organization: string;
}
