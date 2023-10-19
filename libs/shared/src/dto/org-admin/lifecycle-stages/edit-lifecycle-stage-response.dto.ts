import { ApiProperty } from '@nestjs/swagger';

export class EditLifecycleStageResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6530c00f340f8b9d7cbe4710',
      name: 'Customer',
      description: 'Customer Description',
      createdBy: '65309ddd0087d2776c1b8de2',
      isDeleted: false,
      createdAt: '2023-10-19T05:35:11.303Z',
      updatedAt: '2023-10-19T05:39:23.242Z',
      updatedBy: '65309ddd0087d2776c1b8de2',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
