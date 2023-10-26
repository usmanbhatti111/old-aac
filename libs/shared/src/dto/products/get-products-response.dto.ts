import { ApiProperty } from '@nestjs/swagger';

export class GetProductsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Products Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '6538f07835e6f387f86653b0',
        name: 'Marketing',
        description: 'Market your prodcuts with Air Apple Cart',
        logo: {
          id: '7e37c9c8-3d8a-4dab-99c4-2678d3a96054',
          url: 'products/7e37c9c8-3d8a-4dab-99c4-2678d3a96054.png',
          size: 33184,
          mimetype: 'image/png',
        },
        status: 'inactive',
        createdBy: '6538bb480b3f9e9d83d4a2ce',
        isDeleted: false,
        createdAt: '2023-10-25T10:39:52.216Z',
        updatedAt: '2023-10-25T10:39:52.216Z',
      },
      {
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
    ],
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
