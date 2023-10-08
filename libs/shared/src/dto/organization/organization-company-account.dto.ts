import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export interface IOrganizationCompanyAccount {
  organizationId: string;
  logoUrl?: string;
  accountName: string;
  phoneNo: string;
  address: string;
  postCode: string;
  status: string;
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
  @IsNotEmpty()
  address: string;

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
    example: 'Active',
    description: 'The status of organization company account.',
  })
  readonly status: string;
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
  @IsNotEmpty()
  address: string;

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
    example: 'Active',
    description: 'The status of organization company account.',
  })
  readonly status: string;
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
