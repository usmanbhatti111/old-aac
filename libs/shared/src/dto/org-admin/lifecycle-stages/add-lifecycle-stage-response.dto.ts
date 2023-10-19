import { ApiProperty } from '@nestjs/swagger';

export class AddLifecycleStageResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6530bf407619be17d8955b06',
      name: 'Subscriber',
      description: 'Subscriber Description',
      createdBy: '65309ddd0087d2776c1b8de2',
      isDeleted: false,
      createdAt: '2023-10-19T05:31:44.144Z',
      updatedAt: '2023-10-19T05:31:44.144Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
