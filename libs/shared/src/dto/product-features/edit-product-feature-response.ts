import { ApiProperty } from '@nestjs/swagger';

export class EditProductFeatureResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Product Feature Update Successully' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6531f27e67cff9f7975ee5d1',
      productId: '6531f2a267cff9f7975ee5d3',
      name: 'Create Deals',
      description: 'Create Deals Description',
      status: 'active',
      createdBy: '56cb91bdc3464f14678934ca',
      isDeleted: false,
      createdAt: '2023-10-20T03:22:38.317Z',
      updatedAt: '2023-10-20T03:26:38.678Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
