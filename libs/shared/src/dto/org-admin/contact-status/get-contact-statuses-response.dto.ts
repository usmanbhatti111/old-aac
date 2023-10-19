import { ApiProperty } from '@nestjs/swagger';

export class GetContactStatusesResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      conatactStatus: [
        {
          _id: '6530acd666befd9aa687d6dc',
          name: 'Pending',
          description: 'Pending Contact Status',
          status: 'inactive',
          createdBy: '65309ddd0087d2776c1b8de2',
          isDeleted: false,
          createdAt: '2023-10-19T04:13:10.317Z',
          updatedAt: '2023-10-19T04:13:10.317Z',
        },
        {
          _id: '65309e0446672fc6cc7bcf7d',
          name: 'New',
          description: 'New Contact Status',
          status: 'active',
          createdBy: '65309ddd0087d2776c1b8de2',
          isDeleted: false,
          createdAt: '2023-10-19T03:09:56.159Z',
          updatedAt: '2023-10-19T03:10:52.198Z',
          updatedBy: '65309ddd0087d2776c1b8de2',
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
