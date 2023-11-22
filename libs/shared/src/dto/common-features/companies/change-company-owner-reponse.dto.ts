import { ApiProperty } from '@nestjs/swagger';

export class ChangeCompanyOwnerResponseDto {
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
