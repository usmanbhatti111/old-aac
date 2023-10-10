import { ApiProperty } from '@nestjs/swagger';

export class GetNewsOrEventResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'News or Event Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: {
      id: '65154bdc3064871640f8ce14',
      name: 'Twitter Logo',
      type: 'news',
      description: 'Elon Musk changed Twitter Logo',
      status: 'active',
      modifier_id: '56cb91bdc3464f14678934ca',
      modified_at: '2023-09-28T09:48:12.706Z',
      isDeleted: false,
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
