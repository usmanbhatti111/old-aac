import { ApiProperty } from '@nestjs/swagger';

export class EditProductCategoryResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
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
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
