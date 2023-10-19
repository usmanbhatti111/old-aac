import { ApiProperty } from '@nestjs/swagger';

export class EditFileResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '65154bdc3064871640f8ce14',
        createdById: '65154bdc3064871640f8ce14',
        name: 'folderName',
        folderId: '65154bdc3064871640f8ce14',
        createdAt: '2023-09-27T12:00:00Z',
        updatedAt: '2023-09-27T12:00:00Z',
      },
    ],
  })
  data: [object];
  @ApiProperty({ example: null })
  errors: [];
}
