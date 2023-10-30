import { ApiProperty } from '@nestjs/swagger';

export class CreateContactCallResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Contact Call Created Successfully' })
  message: string;

  @ApiProperty({
    example: {
      _id: '65389a91e069566942785b91',
      title: 'title',
      attachmentId: '651bdf53beeb02bc627d6804',
      note: 'note',
      contactId: '652e11c51c10d7d373d23b05',
      contactOwnerId: '652d0c8612be46f5da445de8',
      attendees: [],
      outcome: 'Interested',
      startDate: '2023-10-25T04:09:47.998Z',
      endDate: '2023-10-25T04:09:47.998Z',
      isDeleted: false,
      createdAt: '2023-10-25T04:33:21.689Z',
      updatedAt: '2023-10-25T04:33:21.689Z',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}
