import { ApiProperty } from '@nestjs/swagger';

export class EditProductResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Product Updated Successfully' })
  message: string;

  @ApiProperty({
    example: {
      _id: '651e3edb9ef944b21fc2cb8a',
      name: 'Sales',
      description: 'Manage your sales with Air Apple Cart',
      logo: '6513b01ed274bd98dfacaf06',
      isActive: true,
      modifiedBy: '56cb91bdc3464f14678934ca',
      isDeleted: false,
      createdAt: '2023-10-05T04:43:07.908Z',
      updatedAt: '2023-10-05T04:43:57.290Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
