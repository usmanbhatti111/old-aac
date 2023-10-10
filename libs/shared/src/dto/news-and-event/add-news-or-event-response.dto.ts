import { ApiProperty } from '@nestjs/swagger';

export class AddNewsOrEventResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'News Added' })
  message: string;

  @ApiProperty({
    example: {
      id: '651bc0261995ac60f7134c67',
      name: 'Twitter Logo',
      type: 'news',
      description: 'Elon Musk changed Twitter Logo',
      status: 'inactive',
      modifier_id: '56cb91bdc3464f14678934ca',
      modified_at: '2023-10-03T07:17:58.881Z',
      isDeleted: false,
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
