import { ApiProperty } from '@nestjs/swagger';

export class EditContactCallResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Contact Call Updated Successfully' })
  message: string;

  @ApiProperty({
    example: {
      _id: '65389a5be069566942785b88',
      title: 'title2',
      attachmentId: '652d0c8612be46f5da445de8',
      note: 'note',
      contactId: '652e11c51c10d7d373d23b05',
      contactOwnerId: '652d0c8612be46f5da445de8',
      attendees: ['652d0c8612be46f5da445de8'],
      outcome: 'Interested',
      startDate: '2023-10-25T03:29:31.164Z',
      endDate: '2023-10-25T03:29:31.164Z',
      isDeleted: false,
      createdAt: '2023-10-25T04:32:27.036Z',
      updatedAt: '2023-10-25T04:32:27.036Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
