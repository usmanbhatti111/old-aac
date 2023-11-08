import { ApiProperty } from '@nestjs/swagger';

export class GetTaxsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      taxCalculations: [
        {
          _id: '65488f11b2437fd36be9103c',
          name: 'Sales',
          percentage: 20,
          applyOn: ['products', 'quotes'],
          status: 'active',
          description: 'Sales tax description',
          createdBy: '65488ce0ff900ee743130657',
          isDeleted: false,
          createdAt: '2023-11-06T07:00:33.664Z',
          updatedAt: '2023-11-06T07:27:44.520Z',
          deletedBy: '65488ce0ff900ee743130657',
          updatedBy: '65488ce0ff900ee743130657',
        },
        {
          _id: '65488e04bac9d0ae9b22d760',
          name: 'VAT',
          percentage: 7.5,
          applyOn: ['products', 'invoice'],
          status: 'active',
          description: 'VAT tax description',
          createdBy: '65488ce0ff900ee743130657',
          isDeleted: false,
          createdAt: '2023-11-06T06:56:04.113Z',
          updatedAt: '2023-11-06T07:17:49.060Z',
          updatedBy: '65488ce0ff900ee743130657',
        },
      ],
      meta: {
        page: 1,
        pages: 1,
        limit: 10,
        total: 2,
      },
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
