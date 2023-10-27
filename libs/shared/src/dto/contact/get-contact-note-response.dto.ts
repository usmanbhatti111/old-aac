import { ApiProperty } from '@nestjs/swagger';

export class GetContactNoteResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Contact Note Get Successfully' })
  message: string;

  @ApiProperty({
    example: {
      _id: '653763110e4940eeed096451',
      title: 'asd',
      description: 'sdasd',
      contactId: '6536182ab140f075d03b3c4f',
      updatedBy: '652d0c8612be46f5da445de8',
      isDeleted: false,
      createdAt: '2023-10-24T06:24:17.007Z',
      updatedAt: '2023-10-24T06:24:17.007Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
