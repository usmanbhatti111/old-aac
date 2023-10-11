import { ApiProperty } from '@nestjs/swagger';

export class GetProductsFeaturesResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Products Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: {
      productfeatures: [
        {
          _id: '651e8beef2f36bc0d3cf77be',
          name: 'Create Deals',
          description: 'Create Deals Description',
          isActive: false,
          isDeleted: false,
          createdAt: '2023-10-05T10:11:58.050Z',
          updatedAt: '2023-10-05T10:11:58.050Z',
          productName: 'Sales',
        },
        {
          _id: '651e6c111d3b9d4452aad1c0',
          name: 'Edit Goal',
          description: 'Edit Goal Description',
          isActive: true,
          isDeleted: false,
          createdAt: '2023-10-05T07:56:01.217Z',
          updatedAt: '2023-10-09T10:06:46.097Z',
          modifiedBy: '56cb91bdc3464f14678934ca',
          productName: 'Sales',
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
