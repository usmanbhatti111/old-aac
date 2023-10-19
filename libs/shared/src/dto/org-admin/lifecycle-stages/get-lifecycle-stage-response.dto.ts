import { ApiProperty } from '@nestjs/swagger';

export class GetLifecycleStageResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6530c020340f8b9d7cbe4712',
      name: 'Lead',
      description: 'Lead Description',
      createdBy: '65309ddd0087d2776c1b8de2',
      isDeleted: false,
      createdAt: '2023-10-19T05:35:28.740Z',
      updatedAt: '2023-10-19T05:35:28.740Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
