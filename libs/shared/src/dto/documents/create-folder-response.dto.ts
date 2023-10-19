import { ApiProperty } from '@nestjs/swagger';

export class CreateFolderResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      name: 'my folder',
      _id: '651f8ef1ce48c8eb739ca5ae',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}
