import { ApiProperty } from '@nestjs/swagger';

export class GetProductsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Products Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '651e3a095148c684b4cf2436',
        name: 'Marketing',
        description: 'Market your brand with Air Apple Cart',
        logo: '6513b01ed274bd98dfacaf06',
        isActive: false,
        modifiedBy: '56cb91bdc3464f14678934ca',
        isDeleted: false,
        createdAt: '2023-10-05T04:22:33.177Z',
        updatedAt: '2023-10-05T04:22:33.177Z',
      },
      {
        _id: '651e3a3e8dd97aee17db7bd1',
        name: 'Sales',
        description: 'Manage your sales with Air Apple Cart',
        logo: '6513b01ed274bd98dfacaf06',
        isActive: true,
        modifiedBy: '56cb91bdc3464f14678934ca',
        isDeleted: false,
        createdAt: '2023-10-05T04:23:26.238Z',
        updatedAt: '2023-10-05T04:23:57.712Z',
      },
    ],
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
