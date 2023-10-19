import { ApiProperty } from '@nestjs/swagger';

export class GetContactNotesResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Contact Notes Get Successfully' })
  message: string;

  @ApiProperty({
    example: {
      contacts: [
        {
          _id: '652922553b1d5dc961080ec7',
          email: 'maarij.bhatti@ceative.co.uk',
          profilePictureId: '651bdf53beeb02bc627d6804',
          firstName: 'Maarij',
          lastName: 'Bhatti',
          address: 'Bhatti',
          dateOfBirth: '2023-10-13T10:53:42.648Z',
          phoneNumber: '00923165372970',
          whatsAppNumber: '00923165372970',
          contactOwnerId: '651bdf53beeb02bc627d6804',
          jobTitle: 'developer',
          isDeleted: false,
          lifeCycleStageId: '651bdf53beeb02bc627d6804',
          statusId: '651bdf53beeb02bc627d6804',
          dataOfJoinig: '2023-10-13T10:53:42.649Z',
          createdAt: '2023-10-13T10:56:21.428Z',
          updatedAt: '2023-10-13T10:56:21.428Z',
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
