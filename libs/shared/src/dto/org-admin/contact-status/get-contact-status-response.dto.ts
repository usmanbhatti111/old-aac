import { ApiProperty } from '@nestjs/swagger';

export class GetContactStatusResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '652f80acbc49bce35e534c1c',
      name: 'New',
      description: 'New Contact Status',
      status: 'inactive',
      createdBy: '652f5ada72da99d098a93719',
      isDeleted: false,
      createdAt: '2023-10-18T06:52:28.062Z',
      updatedAt: '2023-10-18T06:52:28.062Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
