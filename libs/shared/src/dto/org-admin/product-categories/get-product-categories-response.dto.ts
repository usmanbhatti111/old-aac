import { ApiProperty } from '@nestjs/swagger';

export class GetProductCategoriesResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      productcategories: [
        {
          _id: '652f6cd296641889ba8816cd',
          name: 'Product Category name 2',
          description: '<h1>product Category Description</h1>',
          status: 'inactive',
          createdBy: '652f5ada72da99d098a93719',
          isDeleted: false,
          createdAt: '2023-10-18T05:27:46.399Z',
          updatedAt: '2023-10-18T05:27:46.399Z',
        },
        {
          _id: '652f6cba96641889ba8816cb',
          name: 'Product Category name 1',
          description: '<h1>product Category Description</h1>',
          status: 'active',
          createdBy: '652f5ada72da99d098a93719',
          isDeleted: false,
          createdAt: '2023-10-18T05:27:22.225Z',
          updatedAt: '2023-10-18T05:27:57.349Z',
          updatedBy: '652f5ada72da99d098a93719',
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
