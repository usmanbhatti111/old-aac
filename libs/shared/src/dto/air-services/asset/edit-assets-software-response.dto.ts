import { ApiProperty } from '@nestjs/swagger';

export class EditAssetsSoftwareResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Assets Software Edit Successfully',
  })
  message: string;
  @ApiProperty({
    example: {
      _id: '6526bb24b8726aed99bda2d7',
      details: {
        description: 'Enter Description',
        publisher: 'Name of publishersss',
        Category: 'Any thingssssss',
      },
      name: 'string',
      status: 'Restricted',
      type: 'Desktop',
      createdAt: '2023-10-11T15:11:32.787Z',
      updatedAt: '2023-10-12T15:23:20.526Z',
    },
  })
  data: {};
  @ApiProperty({ example: null })
  errors: [];
}
