import { ApiProperty } from '@nestjs/swagger';

export class GetTasklistResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'User Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: {
      tasks: [
        {
          _id: '6527c1ba7f7151d4953910b2',
          ticketId: '651bdf53beeb02bc627d6804',
          title: 'Title Name',
          description: 'Content will display here...',
          workSpace: 'Content will display here...',
          assignTo: 'User',
          status: 'Status',
          notifyBefore: '15 Minutes',
          startDate: '2023-10-12T09:51:52.910Z',
          endDate: '2023-10-12T09:51:52.911Z',
          plannedEffort: '1h10m',
          createdAt: '2023-10-12T09:51:54.958Z',
          updatedAt: '2023-10-12T09:51:54.958Z',
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
