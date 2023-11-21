import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6544d211c7d6a2a220c91cf3',
      firstName: 'alo ',
      middleName: 'qaqor',
      lastName: 'tol',
      email: 'aliqaqor@yopmail.com',
      phoneNumber: '03215987461',
      postCode: '2251',
      address: {
        flatNumber: 'aman',
        buildingName: 'aman plaza',
        streetName: 'ali cho',
        city: 'lahore',
        country: 'pakistan',
      },
      jobTitle: 'ludkhurba',
      facebookUrl: 'facebook.com',
      linkedInUrl: 'linkedin',
      role: 'ORG_ADMIN',
      status: 'INACTIVE',
      products: [],
      organization: '6544d211c7d6a2a220c91cf1',
      createdBy: '6535ed927005e477e9ebbab0',
      createdAt: '2023-11-03T10:57:21.487Z',
      updatedAt: '2023-11-03T10:57:21.487Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
