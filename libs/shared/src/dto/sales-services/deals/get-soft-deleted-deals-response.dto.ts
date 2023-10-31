import { ApiProperty } from '@nestjs/swagger';

export class GetSoftDeletedDealsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      deals: [
        {
          _id: '653b52a154d4b91f10f7e522',
          name: 'Test Deal 2',
          deletedAt: '2023-10-30T05:44:50.039Z',
          deletedBy: {
            _id: '653b47c4bb3e468fdf58c9ac',
            name: 'Dianne Russell',
          },
        },
        {
          _id: '653f38f781f49cda3cd33c7d',
          name: 'Deal name',
          deletedAt: '2023-10-30T05:06:07.552Z',
          deletedBy: {
            _id: '653b47c4bb3e468fdf58c9ac',
            name: 'Dianne Russell',
          },
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
