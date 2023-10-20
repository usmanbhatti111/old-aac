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
          _id: '6531f2b367cff9f7975ee5d5',
          productId: '6531f2a267cff9f7975ee5d3',
          name: 'Create Deals 2',
          description: 'Create Deals Description',
          status: 'inactive',
          createdBy: '56cb91bdc3464f14678934ca',
          isDeleted: false,
          createdAt: '2023-10-20T03:23:31.249Z',
          updatedAt: '2023-10-20T03:23:31.249Z',
          productName: 'Sales',
        },
        {
          _id: '6531f27e67cff9f7975ee5d1',
          productId: '6531f2a267cff9f7975ee5d3',
          name: 'Create Deals',
          description: 'Create Deals Description',
          status: 'inactive',
          createdBy: '56cb91bdc3464f14678934ca',
          isDeleted: false,
          createdAt: '2023-10-20T03:22:38.317Z',
          updatedAt: '2023-10-20T03:22:38.317Z',
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
