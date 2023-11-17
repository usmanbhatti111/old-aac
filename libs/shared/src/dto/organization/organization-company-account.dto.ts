import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform,Type } from 'class-transformer';
import { paginationDTO } from '../pagination/pagination.dto';
import { IdDto } from '../common';
import { toMongoObjectId } from 'libs/shared/src/functions';

export interface IOrganizationCompanyAccount {
  organizationId: string;
  logoUrl?: string;
  accountName: string;
  phoneNo: string;
  address?: string;
  unit?: string;
  buildingName?: string;
  buildingNumber?: string;
  streetName?: string;
  city?: string;
  country?: string;
  isActive: boolean;
  postCode: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  isDeleted?: boolean;
}

export class CreateOrganizationCompanyAccountDto {
  @ApiProperty({
    example: '93840926A',
    description:
      'The unique identifier for the organization associated with this account.',
  })
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({
    example: 'My Company',
    description: 'The name of the account.',
  })
  @IsNotEmpty()
  accountName: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'The phone number associated with the account.',
  })
  @IsNotEmpty()
  phoneNo: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'The address of the account.',
  })
  address?: string;

  @ApiProperty({
    example: '12345',
    description: 'The postal code of the account.',
  })
  @IsNotEmpty()
  postCode: string;

  @ApiProperty({
    example: 'https://example.com/logo.png',
    description: "The URL to the account's logo.",
  })
  logoUrl: string;

  @ApiProperty({
    type: [String],
    description: 'The products associated with this account.',
  })
  products: string[];

  @ApiProperty({
    example: '16',
  })
  unit?: string;

  @ApiProperty({
    example: 'A',
  })
  buildingName?: string;

  @ApiProperty({
    example: 'A1',
  })
  buildingNumber?: string;

  @ApiProperty({
    example: '102',
  })
  streetName?: string;

  @ApiProperty({
    example: 'Islamabad',
  })
  city?: string;

  @ApiProperty({
    example: 'Pakistan',
  })
  country?: string;

  @ApiProperty({
    example: true,
    description: 'Status of account',
  })
  isActive: boolean;
  createdBy?: string;
}

export class UpdateOrganizationCompanyAccountDto extends CreateOrganizationCompanyAccountDto {
  id?: string;
  updatedBy?: string;
}

export class DeleteOrganizationCompanyAccountResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({})
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}

export class DeleteOrganizationCompanyAccountDto extends IdDto {
  deletedBy: string;
}

export class UpdateOrganizationCompanyAccountStatusDto extends IdDto {
  updatedBy: string;
  @ApiProperty({
    example: true,
    description: 'Status of account',
  })
  isActive: boolean;
}

export class GetAllOrganizationCompanyAccountsDto extends paginationDTO {
  
  @IsNotEmpty()
  @Transform(toMongoObjectId)
  organizationId: string;
}
export class OrganizationCompanyAccountDto {
  @ApiProperty({
    example: '168927646',
    description: 'The unique identifier for the organization company account.',
  })
  readonly id: string;

  @ApiProperty({
    example: '93840926A',
    description:
      'The unique identifier for the organization associated with this account.',
  })
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({
    example: 'My Company',
    description: 'The name of the account.',
  })
  @IsNotEmpty()
  accountName: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'The phone number associated with the account.',
  })
  @IsNotEmpty()
  phoneNo: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'The address of the account.',
  })
  address?: string;

  @ApiProperty({
    example: '12345',
    description: 'The postal code of the account.',
  })
  @IsNotEmpty()
  postCode: string;

  @ApiProperty({
    example: 'https://example.com/logo.png',
    description: "The URL to the account's logo.",
  })
  logoUrl: string;

  @ApiProperty({
    type: [String],
    description: 'The products associated with this account.',
  })
  products: string[];

  @ApiProperty({
    example: '16',
  })
  unit?: string;

  @ApiProperty({
    example: 'A',
  })
  buildingName?: string;

  @ApiProperty({
    example: 'A1',
  })
  buildingNumber?: string;

  @ApiProperty({
    example: '102',
  })
  streetName?: string;

  @ApiProperty({
    example: 'Islamabad',
  })
  city?: string;

  @ApiProperty({
    example: 'Pakistan',
  })
  country?: string;

  @ApiProperty({
    example: true,
    description: 'Status of account',
  })
  isActive: boolean;
}

export class OrganizationCompanyAccountResponseDto {
  @ApiProperty({
    example: 200,
  })
  status: number;

  @ApiProperty({
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    type: OrganizationCompanyAccountDto,
  })
  data: OrganizationCompanyAccountDto;

  @ApiProperty({
    example: '',
  })
  error: string;
}

export class OrganizationCompanyAccountsResponseDto {
  @ApiProperty({
    example: 200,
  })
  status: number;

  @ApiProperty({
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    type: [OrganizationCompanyAccountDto],
  })
  data: [OrganizationCompanyAccountDto];

  @ApiProperty({
    example: '',
  })
  error: string;
}

export class GetOrganizationCompanyAccountDto {
  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @ApiProperty({
    example: 10,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;
}
