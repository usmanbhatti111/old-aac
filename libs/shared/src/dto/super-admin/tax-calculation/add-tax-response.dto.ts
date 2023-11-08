import { ApiProperty } from '@nestjs/swagger';

export class AddTaxResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'A new Quick Link added' })
  message: string;

  @ApiProperty({
    example: {
      _id: '65488f11b2437fd36be9103c',
      name: 'Sales',
      percentage: 20,
      applyOn: ['products', 'quotes'],
      status: 'inactive',
      description: 'Sales tax description',
      createdBy: '65488ce0ff900ee743130657',
      isDeleted: false,
      createdAt: '2023-11-06T07:00:33.664Z',
      updatedAt: '2023-11-06T07:00:33.664Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
