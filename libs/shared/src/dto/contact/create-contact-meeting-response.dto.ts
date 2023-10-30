import { ApiProperty } from '@nestjs/swagger';

export class CreateContactMeetingResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Contact Meeting Created Successfully' })
  message: string;

  @ApiProperty({
    example: {
      _id: '652e131d1c10d7d373d23b09',
      title: 'title',
      attachmentId: '651bdf53beeb02bc627d6804',
      description: 'description',
      contactId: '651bdf53beeb02bc627d6804',
      createdBy: '652d0c8612be46f5da445de8',
      isDeleted: false,
      createdAt: '2023-10-17T04:52:45.640Z',
      updatedAt: '2023-10-17T04:52:45.640Z',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}
