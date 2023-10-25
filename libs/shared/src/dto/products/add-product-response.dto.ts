import { ApiProperty } from '@nestjs/swagger';

export class AddProductResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'A new Product added' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6538ef8cb3658ab4641fb188',
      name: 'Sales',
      description: 'Manage your sales with Air Apple Cart',
      logo: {
        id: 'bdee1611-d66a-476a-9a8c-c2ceec82dfca',
        url: 'products/bdee1611-d66a-476a-9a8c-c2ceec82dfca.jpg',
        size: 53591,
        mimetype: 'image/jpeg',
      },
      status: 'inactive',
      createdBy: '6538bb480b3f9e9d83d4a2ce',
      isDeleted: false,
      createdAt: '2023-10-25T10:35:56.529Z',
      updatedAt: '2023-10-25T10:35:56.529Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
