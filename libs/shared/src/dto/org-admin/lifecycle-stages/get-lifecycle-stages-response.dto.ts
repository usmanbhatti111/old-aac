import { ApiProperty } from '@nestjs/swagger';

export class GetLifecycleStagesResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      lifecycleStages: [
        {
          _id: '6530c020340f8b9d7cbe4712',
          name: 'Lead',
          description: 'Lead Description',
          createdBy: '65309ddd0087d2776c1b8de2',
          isDeleted: false,
          createdAt: '2023-10-19T05:35:28.740Z',
          updatedAt: '2023-10-19T05:35:28.740Z',
        },
        {
          _id: '6530c00c340f8b9d7cbe470e',
          name: 'Subscriber',
          description: 'Subscriber Description',
          createdBy: '65309ddd0087d2776c1b8de2',
          isDeleted: false,
          createdAt: '2023-10-19T05:35:08.850Z',
          updatedAt: '2023-10-19T05:35:08.850Z',
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
