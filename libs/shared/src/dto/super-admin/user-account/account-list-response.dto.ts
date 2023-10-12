import { ApiProperty } from '@nestjs/swagger';

export class GetAccountlistResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Records Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: {
      useraccounts: [
        {
          _id: '65263a642b37cd2adcace5b6',
          manageRole: 'ORGANIZATION ADMIN',
          status: 'INACTIVE',
          company: '65237e5b4a426328bd15f439',
          products: '65237e5b4a426328bd15f439',
          createdAt: '2023-10-11T06:02:12.760Z',
          deletedAt: '2023-10-11T06:02:12.760Z',
          updatedAt: '2023-10-11T06:02:12.760Z',
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
