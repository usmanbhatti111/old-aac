import { ApiProperty } from '@nestjs/swagger';

export class GetNewsAndEventsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'News and Events Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: {
      newsandevents: [
        {
          _id: '65201308b65995a8c80d357c',
          name: 'Whatsapp Channel',
          description: 'WhatsApp introduces a new feature of Channel',
          type: 'news',
          status: 'inactive',
          modifiedBy: '56cb91bdc3464f14678934ca',
          isDeleted: false,
          createdAt: '2023-10-06T14:00:40.600Z',
          updatedAt: '2023-10-06T14:00:40.600Z',
        },
        {
          _id: '651ffb8095cf9e5f885b27ce',
          name: 'Twitter Logo',
          description: 'Elon Musk changed Twitter Logo',
          type: 'news',
          status: 'active',
          modifiedBy: '56cb91bdc3464f14678934ca',
          isDeleted: false,
          createdAt: '2023-10-06T12:20:16.958Z',
          updatedAt: '2023-10-06T12:44:00.474Z',
        },
      ],
      meta: {
        page: 1,
        pages: 1,
        limit: 10,
        total: 2,
      },
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
