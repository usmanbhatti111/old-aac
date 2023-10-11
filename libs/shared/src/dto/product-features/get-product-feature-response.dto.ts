import { ApiProperty } from '@nestjs/swagger';

export class GetProductFeatureResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'A Product Fetched Successully' })
  message: string;

  @ApiProperty({
    example: {
      _id: '651e6c111d3b9d4452aad1c0',
      name: 'Edit Goal',
      description: 'Edit Goal Description',
      isActive: true,
      isDeleted: false,
      createdAt: '2023-10-05T07:56:01.217Z',
      updatedAt: '2023-10-09T10:06:46.097Z',
      modifiedBy: '56cb91bdc3464f14678934ca',
      productId: '651fd90c37afc24d56a3c7ea',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
