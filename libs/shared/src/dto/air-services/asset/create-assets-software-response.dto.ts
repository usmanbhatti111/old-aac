import { ApiProperty } from '@nestjs/swagger';

export class CreateAssetsSoftwareResponse {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({
    example: 'Assets Software Created Successfully',
  })
  message: string;
  @ApiProperty({
    example: {
      _id: '6526971ff0dd2026bb3cb277',
      details: {
        description: 'Enter Description',
        publisher: 'Name of publisher',
        Category: 'Any thing',
      },
      name: 'string',
      status: 'Restricted',
      type: 'Desktop',
      createdAt: '2023-10-11T12:37:51.210Z',
      updatedAt: '2023-10-11T12:37:51.210Z',
    },
  })
  data: {};
  @ApiProperty({ example: null })
  errors: [];
}
