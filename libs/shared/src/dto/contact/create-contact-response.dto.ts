import { ApiProperty } from '@nestjs/swagger';

export class CreateContactResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Contact Created Successfully' })
  message: string;

  @ApiProperty({
    example: {
      _id: '653f3ff3a1584cc7e7fc65d7',
      email: 'maarij.bhatti949@ceative.co.uk',
      profilePicture: {
        id: '329e689d-2297-4a51-a1b0-32ea07a3fdd0',
        url: 'contacts/329e689d-2297-4a51-a1b0-32ea07a3fdd0.jpg',
        size: 38919,
        mimetype: 'image/jpeg',
      },
      firstName: 'Maarij',
      lastName: 'Bhatti',
      address: 'Bhatti',
      dateOfBirth: '2023-10-30T05:17:50.382Z',
      phoneNumber: '00923165372970',
      whatsAppNumber: '00923165372970',
      contactOwnerId: '652d0c8612be46f5da445de8',
      jobTitle: 'developer',
      createdBy: '652d0c8612be46f5da445de8',
      isDeleted: false,
      lifeCycleStageId: '6530c00c340f8b9d7cbe470e',
      dataOfJoinig: '2023-10-30T05:17:50.382Z',
      createdAt: '2023-10-30T05:32:35.779Z',
      updatedAt: '2023-10-30T05:32:35.779Z',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}
