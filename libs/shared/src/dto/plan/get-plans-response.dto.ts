import { ApiProperty } from '@nestjs/swagger';

export class GetPlansResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Plans Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '651e8b5c638f78f6b70924fc',
        description: 'some description',
        default_users: 12,
        default_storage: 12,
        plan_price: 12,
        additional_per_user_price: 12,
        additional_storage_price: 12,
        plan_type_id: '651bee19040d3384e81b81ff',
        plan_product: [],
        is_active: true,
        created_at: '2023-10-05T10:09:32.658Z',
        __v: 0,
        plan_type: [
          {
            _id: '651bee19040d3384e81b81ff',
            name: 'Growth',
          },
        ],
      },
    ],
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
