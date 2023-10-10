import { ApiProperty } from '@nestjs/swagger';

export class GetPlanResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Plans Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6524dc956f5b8e4b978a037f',
      description: 'some description',
      default_users: 12,
      default_storage: 12,
      plan_price: 12,
      additional_per_user_price: 12,
      plan_products: ['6524d340be1197f49712edb9', '6524d56be856be6371f20566'],
      additional_storage_price: 12,
      plan_type_id: '651bee19040d3384e81b81ff',
      is_active: true,
      created_at: '2023-10-10T05:09:41.761Z',
      createdAt: '2023-10-10T05:09:41.765Z',
      updatedAt: '2023-10-10T05:09:41.796Z',
      plan_type: [
        {
          _id: '651bee19040d3384e81b81ff',
          name: 'Growth',
        },
      ],
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
