import { ApiProperty } from '@nestjs/swagger';

export class AddProductCategoryResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '652f6cd296641889ba8816cd',
      name: 'Product Category name 2',
      description: '<h1>product Category Description</h1>',
      status: 'inactive',
      createdBy: '652f5ada72da99d098a93719',
      isDeleted: false,
      createdAt: '2023-10-18T05:27:46.399Z',
      updatedAt: '2023-10-18T05:27:46.399Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
