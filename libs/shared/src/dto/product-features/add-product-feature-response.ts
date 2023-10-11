import { ApiProperty } from '@nestjs/swagger';

export class AddProductFeatureResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'A new Product Feature Added Successfully' })
  message: string;

  @ApiProperty({
    example: {
      _id: '652686ec848b41f28761764e',
      productId: '651fd9863066c8a22a9526c4',
      name: 'View Quote',
      description: 'Description',
      isActive: false,
      createdBy: '56cb91bdc3464f14678934ca',
      isDeleted: false,
      createdAt: '2023-10-11T11:28:44.539Z',
      updatedAt: '2023-10-11T11:28:44.539Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
