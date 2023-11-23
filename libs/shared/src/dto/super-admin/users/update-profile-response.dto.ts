import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Information Updated Successfully' })
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
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
