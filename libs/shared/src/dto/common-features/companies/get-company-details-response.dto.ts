import { ApiProperty } from '@nestjs/swagger';

export class GetCompanyDetailsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Get Success' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '655c335b50b3f45b9169f205',
        domain: 'smd.com',
        name: 'share my dine',
        ownerId: '653b47c4bb3e468fdf58c9ac',
        industry: 'consumers services',
        type: 'Partner',
        noOfEmloyee: 5,
        totalRevenue: 411,
        city: 'bristol',
        postalCode: 'EC1V2NX',
        address: 'Address',
        description: 'description',
        linkedInUrl: 'linkedin.com/mlkfiazhussain',
        recordIds: [],
        isDeleted: 'ACTIVE',
        createdAt: '2023-11-21T04:34:35.304Z',
        updatedAt: '2023-11-21T04:34:35.304Z',
        dealStage: '',
        dealOwner: {
          _id: '653b47c4bb3e468fdf58c9ac',
          name: ' Dianne malik Russell',
          email: 'diannerussell@orgadmin.com',
          phoneNumber: '+44 2388 2399',
        },
      },
    ],
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
