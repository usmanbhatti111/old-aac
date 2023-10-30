import { ApiProperty } from '@nestjs/swagger';

export class EditProductResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Product Updated Successfully' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6538ef8cb3658ab4641fb188',
      name: 'Sales',
      description: 'Manage your sales with Air Apple Cart',
      logo: {
        id: '3daad078-5677-43ad-a958-7da4ba32436d',
        url: 'products/3daad078-5677-43ad-a958-7da4ba32436d.jpg',
        size: 53591,
        mimetype: 'image/jpeg',
      },
      status: 'active',
      createdBy: '6538bb480b3f9e9d83d4a2ce',
      isDeleted: false,
      createdAt: '2023-10-25T10:35:56.529Z',
      updatedAt: '2023-10-25T10:38:30.110Z',
      updatedBy: '6538bb480b3f9e9d83d4a2ce',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
