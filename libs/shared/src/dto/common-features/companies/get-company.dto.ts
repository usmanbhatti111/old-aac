import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { paginationDTO } from '../../pagination/pagination.dto';

export class GetComapanyResponseDTO {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Get Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '655634657b3fa24f305b6fa8',
      domain: 'adf',
      name: 'asdf',
      ownerId: '6535ed927005e477e9ebbab0',
      industry: 'industry',
      type: 'Partner',
      noOfEmloyee: 5,
      totalRevenue: 411,
      city: 'string',
      postalCode: '1234',
      address: 'address',
      description: 'description',
      linkedInUrl: 'linkedInUrl',
      dealsIds: [],
      ticketsIds: [],
      attachmentsIds: [],
      contactsIds: [],
      activityLogIds: [],
      tasksIds: [],
      notesIds: [],
      callsIds: [],
      meetingsIds: [],
      emailsIds: [],
      isDeleted: 'ACTIVE',
      createdAt: '2023-11-16T15:25:25.920Z',
      updatedAt: '2023-11-16T16:34:03.737Z',
      updatedBy: '655633c2d9d816a1a1cfbeb2',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}

export class GetComapaniesResponseDTO {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Get Success' })
  message: string;

  @ApiProperty({
    example: {
      compaines: [
        {
          _id: '6557b589779481fb638c87e3',
          domain: 'domain one',
          name: 'name one',
          ownerId: '6535ed927005e477e9ebbab0',
          industry: 'industry',
          type: 'Partner',
          noOfEmloyee: 5,
          totalRevenue: 411,
          city: 'string',
          postalCode: '1234',
          address: 'address',
          description: 'description',
          linkedInUrl: 'linkedInUrl',
          recordIds: [],
          createdAt: '2023-11-17T18:48:41.309Z',
          updatedAt: '2023-11-17T18:48:41.309Z',
          activity: true,
        },
      ],
      meta: {
        page: 1,
        pages: 1,
        limit: 10,
        total: 1,
      },
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}

export class GetComapanyDto extends paginationDTO {
  @ApiProperty({
    type: String,
    required: false,
    example: '',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: '',
    required: false,
  })
  @IsOptional()
  search: string;
}

export class GetDeletedCompanisDto extends paginationDTO {
  @ApiProperty({
    required: false,
    example: '2023-10-02',
  })
  @IsOptional()
  @IsDateString()
  dateStart: string;

  @ApiProperty({
    required: false,
    example: '2023-10-03',
  })
  @IsOptional()
  @IsDateString()
  dateEnd: string;

  @ApiProperty({
    example: '',
    required: false,
  })
  @IsOptional()
  search: string;
}
