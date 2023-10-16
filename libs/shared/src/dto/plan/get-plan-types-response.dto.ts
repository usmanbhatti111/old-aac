import { ApiProperty } from '@nestjs/swagger';

export class GetPlansTypeResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Plans Types Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '65265060b3f1860c66c7adce',
        name: 'growth',
      },
    ],
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
