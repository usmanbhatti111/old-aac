import { ApiProperty } from '@nestjs/swagger';

export class GetTaskManagementlistResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Data Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: {
      data: [
        {
          _id: '652e0e5b78062f55ce35ffa8',
          name: 'Title Name',
          type: 'Call',
          priority: 'Title Name',
          status: 'Title Name',
          deal: 'Title Name',
          associate: 'Title Name',
          dueDate: '2023-10-05T00:00:00.000Z',
          time: '00:00',
          reminder: 'Content will display here...',
          note: 'Content will display here...',
          createdAt: '2023-10-17T04:32:27.087Z',
          updatedAt: '2023-10-17T04:32:27.087Z',
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
