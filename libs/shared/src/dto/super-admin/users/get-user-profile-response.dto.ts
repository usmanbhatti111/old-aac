import { ApiProperty } from '@nestjs/swagger';

export class UserProfileResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Get Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '652627f809a15759b979dd3a',
      role: 'SUPER ADMIN',
      isProductOwner: false,
      firstName: 'ali',
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
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}

export class UserAvatarResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '652627f809a15759b979dd3a',
      role: 'SUPER ADMIN',
      isProductOwner: false,
      firstName: 'ali',
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
      products: [],
      company: [],
      avatar: {
        id: '27529e24-49b9-4e61-a6b9-ce083da1929c',
        url: 'users/avatar/27529e24-49b9-4e61-a6b9-ce083da1929c.jpg',
        size: 62127,
        mimetype: 'image/jpeg',
      },
      createdAt: '2023-10-11T04:43:36.666Z',
      deletedAt: '2023-10-11T04:43:36.666Z',
      updatedAt: '2023-10-11T04:43:36.666Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
