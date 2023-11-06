import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export interface IOrganization {
  logoUrl?: string;
  crn?: string;
  name: string;
  email?: string;
  phoneNo?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  postCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  isDeleted?: boolean;
}
export class CreateOrganizationDto {
  @ApiProperty({
    example: '8C68902',
  })
  crn: string;

  @ApiProperty({
    example: 'Orcalo Holdings',
  })
  name: string;

  @ApiProperty({
    required: true,
    example: 'oh@gmail.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    example: '++13432121',
  })
  @IsNotEmpty()
  phoneNo: string;

  @ApiProperty({
    required: true,
    example: {
      street: 'address',
      city: 'city',
      state: 'state',
      postalCode: 'AN213',
    },
  })
  @IsNotEmpty()
  address: object;

  @ApiProperty({
    required: true,
    example: 'CN789',
  })
  @IsNotEmpty()
  postCode: string;

  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export class UpdateOrganizationDto extends CreateOrganizationDto {
  @ApiProperty({
    required: true,
    example: '65152939f50394f42cee2db4',
  })
  id?: string;
}
export class OrganizationDto {
  @ApiProperty({
    example: '168927646',
    description: 'The unique identifier for the organization.',
  })
  readonly id: string;

  @ApiProperty({
    example: '8C68902',
  })
  crn: string;

  @ApiProperty({
    example: 'Orcalo Holdings',
  })
  name: string;

  @ApiProperty({
    required: true,
    example: 'oh@gmail.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    example: '++13432121',
  })
  @IsNotEmpty()
  phoneNo: string;

  @ApiProperty({
    required: true,
    example: 'Street#234 ',
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    required: true,
    example: 'CN789',
  })
  @IsNotEmpty()
  postCode: string;
}

export class OrganizationResponseDto {
  @ApiProperty({
    example: 200,
  })
  status: number;

  @ApiProperty({
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    type: OrganizationDto,
  })
  data: OrganizationDto;

  @ApiProperty({
    example: '',
  })
  error: string;
}

export class OrganizationsResponseDto {
  @ApiProperty({
    example: 200,
  })
  status: number;

  @ApiProperty({
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    type: [OrganizationDto],
  })
  data: OrganizationDto[];

  @ApiProperty({
    example: '',
  })
  error: string;
}

export class GetOrganizationDto {
  @ApiProperty({
    example: '651e6368a3a6baf2f193efb0',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
