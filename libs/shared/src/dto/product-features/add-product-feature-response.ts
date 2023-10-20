import { ApiProperty } from '@nestjs/swagger';

export class AddProductFeatureResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'A new Product Feature Added Successfully' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6531f2b367cff9f7975ee5d5',
      productId: '6531f2a267cff9f7975ee5d3',
      name: 'Create Deals 2',
      description: 'Create Deals Description',
      status: 'inactive',
      createdBy: '56cb91bdc3464f14678934ca',
      isDeleted: false,
      createdAt: '2023-10-20T03:23:31.249Z',
      updatedAt: '2023-10-20T03:23:31.249Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
