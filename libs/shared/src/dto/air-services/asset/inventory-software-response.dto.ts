import { ApiProperty } from '@nestjs/swagger';

export class InventorySoftwareResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'inventory Software Details Successfully',
  })
  message: string;
  @ApiProperty({
    example: {
      inventories: [
        {
          inventorySoftwares: {
            _id: '6525695c276fe3756c4f11b6',
            details: {
              description: 'Enter Descriptionssss',
              publisher: 'Name of publisher',
              Category: 'Any thing',
            },
            name: 'string',
            status: 'Restricted',
            type: 'Desktop',
            createdAt: '2023-10-10T15:10:20.079Z',
            updatedAt: '2023-10-12T16:06:44.656Z',
          },
        },
        {
          inventorySoftwares: {
            _id: '65256976276fe3756c4f11b8',
            details: {
              description: 'Enter Description',
              publisher: 'Name of publisher',
              Category: 'Any thing',
            },
            name: 'string',
            status: 'Restricted',
            type: 'Desktop',
            createdAt: '2023-10-15T15:10:46.297Z',
            updatedAt: '2023-10-11T15:01:44.107Z',
          },
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
