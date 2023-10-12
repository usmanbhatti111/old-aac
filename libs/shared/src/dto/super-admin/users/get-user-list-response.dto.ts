import { ApiProperty } from '@nestjs/swagger';

export class GetUserslistResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'User Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: {
      users: [
        {
          _id: '652627f809a15759b979dd3a',
          role: 'SUPER ADMIN',
          isProductOwner: false,
          firstName: 'ali',
          middleName: 'jan',
          lastName: 'tesori',
          address: 'tesori por',
          email: 'ali@gmail.com',
          phoneNumber: '123456789',
          postCode: '12345',
          jobTitle: 'Test job',
          facebookUrl: 'facebook.com',
          linkedUrl: 'linkedin.com',
          twitterUrl: 'twitter.com',
          status: 'active',
          jobs: [],
          products: [],
          company: [],
          createdAt: '2023-10-11T04:43:36.666Z',
          deletedAt: '2023-10-11T04:43:36.666Z',
          updatedAt: '2023-10-11T04:43:36.666Z',
        },
      ],
      meta: {
        page: 1,
        pages: 1,
        limit: 10,
        total: 2,
      },
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
