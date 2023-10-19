import { ApiProperty } from '@nestjs/swagger';

export class CreateFileResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      name: 'my folder',
      media: 'https://www.example.com/dummy-image.jpg',
      folderId: '651f8ef1ce48c8eb739ca5ae',
      _id: '651f8ef1ce48c8eb739ca5ae',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}
