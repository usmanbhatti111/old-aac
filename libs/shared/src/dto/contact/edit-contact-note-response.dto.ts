import { ApiProperty } from '@nestjs/swagger';

export class EditContactNoteResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Contact Note Updated Successfully' })
  message: string;

  @ApiProperty({
    example: {
      _id: '653763110e4940eeed096451',
      title: 'yrrtyrtyrt',
      description: 'some desdfsdffsdfsdfsdfsdfsdfscription',
      contactId: '65362002453ee9ee62194277',
      updatedBy: '652d0c8612be46f5da445de8',
      isDeleted: false,
      createdAt: '2023-10-24T06:24:17.007Z',
      updatedAt: '2023-10-24T06:47:27.333Z',
      deletedAt: '2023-10-24T06:45:06.988Z',
      deletedBy: '652d0c8612be46f5da445de8',
      attachmentId: '651bdf53beeb02bc627d6804',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
