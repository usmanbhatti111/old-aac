import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaxResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
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
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}
