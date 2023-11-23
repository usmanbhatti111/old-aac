import { ApiProperty } from '@nestjs/swagger';
import { ECustomizeColumnType } from '@shared/constants';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { toMongoObjectId } from 'libs/shared/src/functions';

export class CreateCompanyCustomizeColumnResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty()
  type: string;

  @ApiProperty({
    example: {
      _id: '655462e69504c030d3724e94',
      userId: '653b47c4bb3e468fdf58c9ac',
      type: ECustomizeColumnType.COMPANIES,
      isDeleted: false,
      columns: [
        {
          slug: 'Compay Owner',
          attributes: 'companyOwner.name email profileImage',
          active: true,
          order: 1,
        },
        {
          slug: 'Company Name',
          attributes: 'name',
          active: true,
          order: 2,
        },
        {
          slug: 'Contacted Person',
          attributes:
            'contactedPerson.name contactedPerson.email contactedPerson.profileImage',
          active: false,
          order: 3,
        },
        {
          slug: 'Company Type',
          attributes: 'type',
          active: true,
          order: 4,
        },
        {
          slug: 'No Of Emloyee',
          attributes: 'noOfEmloyee',
          active: false,
          order: 5,
        },
        {
          slug: 'LinkedIn Profile',
          attributes: 'linkedInUrl',
          active: false,
          order: 6,
        },
        {
          slug: 'Parent Company',
          attributes: 'parentCompanyId',
          active: false,
          order: 7,
        },
        {
          slug: 'Annual Revenue',
          attributes: 'totalRevenue',
          active: false,
          order: 8,
        },
        {
          slug: 'Created Date',
          attributes: 'createdAt',
          active: false,
          order: 9,
        },
        {
          slug: 'Industry',
          attributes: 'industry',
          active: false,
          order: 10,
        },
        {
          slug: 'Phone',
          attributes: 'phone',
          active: false,
          order: 11,
        },
        {
          slug: 'Domain',
          attributes: 'domain',
          active: true,
          order: 12,
        },
      ],
      createdAt: '2023-11-15T06:19:18.907Z',
      updatedAt: '2023-11-15T06:19:18.907Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}

export class CustomizeCompanyColumnsObject {
  slug: string;
  attributes: string;
  active?: boolean;
  order: number;
}

export class CreateCompanyCustomizeColumnDto {
  @ApiProperty({
    type: String,
    required: false,
    example: '56cb91bdc3464f14678934ca',
  })
  @IsNotEmpty()
  @IsOptional()
  @Transform(toMongoObjectId)
  userId?: string;

  @ApiProperty({
    type: String,
    enum: ECustomizeColumnType,
    example: ECustomizeColumnType.COMPANIES,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    type: [CustomizeCompanyColumnsObject],
    isArray: true,
    example: [
      {
        slug: 'Compay Owner',
        attributes: 'companyOwner.name email profileImage',
        active: true,
        order: 1,
      },
      {
        slug: 'Company Name',
        attributes: 'name',
        active: true,
        order: 2,
      },
      {
        slug: 'Contacted Person',
        attributes:
          'contactedPerson.name contactedPerson.email contactedPerson.profileImage',
        active: false,
        order: 3,
      },
      {
        slug: 'Company Type',
        attributes: 'type',
        active: true,
        order: 4,
      },
      {
        slug: 'No Of Emloyee',
        attributes: 'noOfEmloyee',
        active: false,
        order: 5,
      },
      {
        slug: 'LinkedIn Profile',
        attributes: 'linkedInUrl',
        active: false,
        order: 6,
      },
      {
        slug: 'Parent Company',
        attributes: 'parentCompanyId',
        active: false,
        order: 7,
      },
      {
        slug: 'Annual Revenue',
        attributes: 'totalRevenue',
        active: false,
        order: 8,
      },
      {
        slug: 'Created Date',
        attributes: 'createdAt',
        active: false,
        order: 9,
      },
      {
        slug: 'Industry',
        attributes: 'industry',
        active: false,
        order: 10,
      },
      {
        slug: 'Phone',
        attributes: 'phone',
        active: false,
        order: 11,
      },
      {
        slug: 'Domain',
        attributes: 'domain',
        active: true,
        order: 12,
      },
    ],
    required: true,
  })
  @IsNotEmpty()
  @IsArray()
  columns: CustomizeCompanyColumnsObject[];
}

export class GetCompanyCustomizedColumns {
  @Transform(toMongoObjectId)
  userId: string;
}

export class GetCustomizedCompanyColumnsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '655462e69504c030d3724e94',
      userId: '653b47c4bb3e468fdf58c9ac',
      type: ECustomizeColumnType.COMPANIES,
      isDeleted: false,
      columns: [],
      createdAt: '2023-11-15T06:19:18.907Z',
      updatedAt: '2023-11-15T06:19:18.907Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
