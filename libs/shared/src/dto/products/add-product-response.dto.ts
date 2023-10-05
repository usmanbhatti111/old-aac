import { ApiProperty } from '@nestjs/swagger';

export class AddProductResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'A new Product added' })
  message: string;

  @ApiProperty({
    example: {
      _id: '651e3edb9ef944b21fc2cb8a',
      name: 'Sales',
      description: 'Manage your sales with Air Apple Cart',
      logo: '6513b01ed274bd98dfacaf06',
      isActive: false,
      modifiedBy: '56cb91bdc3464f14678934ca',
      isDeleted: false,
      createdAt: '2023-10-05T04:43:07.908Z',
      updatedAt: '2023-10-05T04:43:07.908Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
