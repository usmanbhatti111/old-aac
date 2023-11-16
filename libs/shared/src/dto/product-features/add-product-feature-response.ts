import { ApiProperty } from '@nestjs/swagger';

export class AddProductFeatureResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'A new Product Feature Added Successfully' })
  message: string;

  @ApiProperty({
    example: [
      {
        productId: '56cb91bdc3464f14678934ca',
        name: 'Create Deals',
        description: 'Create Deals Description',
        status: 'inactive',
        createdBy: '65488ce0ff900ee743130657',
        isDeleted: false,
        createdAt: '2023-11-10T04:12:02.305Z',
        updatedAt: '2023-11-10T04:12:02.305Z',
      },
      {
        productId: '56cb91bdc3464f14678934ca',
        name: 'Create Deals',
        description: 'Create Deals Description',
        status: 'inactive',
        createdBy: '65488ce0ff900ee743130657',
        isDeleted: false,
        createdAt: '2023-11-10T04:12:02.306Z',
        updatedAt: '2023-11-10T04:12:02.306Z',
      },
    ],
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
