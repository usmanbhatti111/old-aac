import { ApiProperty } from '@nestjs/swagger';

export class AddEnquiryResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6549c4e28114ce9113606693',
      query: 'Looking for your sales products',
      status: 'pending',
      createdBy: '653b47c4bb3e468fdf58c9ac',
      isDeleted: false,
      createdAt: '2023-11-07T05:02:26.487Z',
      updatedAt: '2023-11-07T05:02:26.487Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
