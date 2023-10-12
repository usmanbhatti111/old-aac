import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Get Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '65263a642b37cd2adcace5b6',
      manageRole: 'ORGANIZATION ADMIN',
      status: 'INACTIVE',
      company: '65237e5b4a426328bd15f439',
      products: '65237e5b4a426328bd15f439',
      createdAt: '2023-10-11T06:02:12.760Z',
      deletedAt: '2023-10-11T06:02:12.760Z',
      updatedAt: '2023-10-11T06:02:12.760Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
