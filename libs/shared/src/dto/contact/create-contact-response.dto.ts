import { ApiProperty } from '@nestjs/swagger';

export class CreateContactResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Contact Created Successfully' })
  message: string;

  @ApiProperty({
    example: {
      _id: '652e131d1c10d7d373d23b09',
      email: 'maarij.bhatti@ceative.co.uk',
      profilePictureId: '651bdf53beeb02bc627d6804',
      firstName: 'Maarij',
      lastName: 'Bhatti',
      address: 'Bhatti',
      dateOfBirth: '2023-10-17T04:21:05.480Z',
      phoneNumber: '00923165372970',
      whatsAppNumber: '00923165372970',
      contactOwnerId: '651bdf53beeb02bc627d6804',
      jobTitle: 'developer',
      createdBy: '652d0c8612be46f5da445de8',
      isDeleted: false,
      lifeCycleStageId: '651bdf53beeb02bc627d6804',
      statusId: '651bdf53beeb02bc627d6804',
      dataOfJoinig: '2023-10-17T04:21:05.480Z',
      createdAt: '2023-10-17T04:52:45.640Z',
      updatedAt: '2023-10-17T04:52:45.640Z',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}
