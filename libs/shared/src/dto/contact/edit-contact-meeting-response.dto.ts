import { ApiProperty } from '@nestjs/swagger';

export class EditContactMeetingResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Contact Meeting Updated Successfully' })
  message: string;

  @ApiProperty({
    example: {
      _id: '652922553b1d5dc961080ec7',
      email: 'maarij.bhatti21@ceative.co.uk',
      profilePictureId: '651bdf53beeb02bc627d6804',
      firstName: 'Maarij21',
      lastName: 'Bhatti11',
      address: '786',
      dateOfBirth: '2023-10-17T04:21:05.481Z',
      phoneNumber: '00923165372970',
      whatsAppNumber: '00923165372970',
      contactOwnerId: '651bdf53beeb02bc627d6804',
      jobTitle: 'developer at orcalo',
      isDeleted: true,
      lifeCycleStageId: '651bdf53beeb02bc627d6804',
      statusId: '651bdf53beeb02bc627d6804',
      dataOfJoinig: '2023-10-17T04:21:05.481Z',
      createdAt: '2023-10-13T10:56:21.428Z',
      updatedAt: '2023-10-17T05:26:47.604Z',
      deletedAt: '2023-10-17T05:14:24.233Z',
      deletedBy: '652d0c8612be46f5da445de8',
      updatedBy: '652d0c8612be46f5da445de8',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
