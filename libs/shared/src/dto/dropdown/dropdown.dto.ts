import { ApiProperty } from '@nestjs/swagger';

export class GetAllDropdownResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '652e0066d73b5bebfb0ab48a',
        name: 'Air Sales',
      },
    ],
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}
