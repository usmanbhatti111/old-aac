import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../schema/user-account';
import { UserRole } from '../../constants/enums';
import { toMongoObjectId } from '../../functions';
import { PaginationDto } from '../common';

export class CreateUserDto {
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

  @ApiProperty({ type: String, example: 'https://www.twitter.com/user' })
  @IsOptional()
  twitterUrl?: string;

  @ApiProperty({ type: String, example: '21399249' })
  @IsOptional()
  crn?: string;

  @ApiProperty({ type: String, example: 'Orcalo Ltd' })
  @IsOptional()
  companyName?: string;

  @ApiProperty({ type: Array, default: [] })
  @IsOptional()
  products?: [];

  organization: string;
}

export class CreateOrgUserDto extends PartialType(
  OmitType(CreateUserDto, ['crn', 'companyName', 'products'] as const)
) {
  @ApiProperty({
    example: UserRole.ORG_EMPLOYEE,
    enum: UserRole,
  })
  @IsNotEmpty()
  role: string;

  @Transform(toMongoObjectId)
  createdBy: string;
}

export class CreateOrgUserParamDto {
  @ApiProperty({
    required: true,
    description: 'Example: 652627f809a15759b979dd3a',
  })
  @IsNotEmpty()
  @Transform(toMongoObjectId)
  orgId: string;
}

export class GetOrgEmployeesQueryDto extends PaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Example: 652627f809a15759b979dd3a',
  })
  @IsOptional()
  @Transform(toMongoObjectId)
  product: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Example: 652627f809a15759b979dd3a',
  })
  @IsOptional()
  @Transform(toMongoObjectId)
  company: string;

  @ApiProperty({
    example: '',
    required: false,
  })
  @IsOptional()
  search: string;

  @Transform(toMongoObjectId)
  orgId: string;
}
