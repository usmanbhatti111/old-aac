import { ApiProperty } from '@nestjs/swagger';

export class CreateContactNoteResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Contact Note Created Successfully' })
  message: string;

  @ApiProperty({
    example: {
      _id: '653f3b1068491ebda11b8c9b',
      title: 'some noteasdasd',
      attachment: {
        id: '2d4e2c0b-8cdf-4c6b-8022-7b32b20a909a',
        url: 'contact-notes/2d4e2c0b-8cdf-4c6b-8022-7b32b20a909a.jpg',
        size: 38919,
        mimetype: 'image/jpeg',
      },
      description: 'some dasdeasdasscription',
      contactId: '652e131d1c10d7d373d23b09',
      updatedBy: '652d0c8612be46f5da445de8',
      isDeleted: false,
      createdAt: '2023-10-30T05:11:44.679Z',
      updatedAt: '2023-10-30T05:11:44.679Z',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}
