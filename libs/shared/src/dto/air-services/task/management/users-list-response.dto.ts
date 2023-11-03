import { ApiProperty } from '@nestjs/swagger';

export class GetUsersListResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Data Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: {
      data: [
        {
          _id: '6543c6dca243b44a4a950c53',
          ticketId: '6543c69da243b44a4a950c51',
          title: 'Title Name',
          description: 'Content will display here...',
          departmentId: '651bdf53beeb02bc627d6804',
          createdBy: '6543a2e91cc0455390e81254',
          assignTo: '651bdf53beeb02bc627d6805',
          status: 'Todo',
          notifyBefore: '5',
          startDate: '2023-11-02T15:56:25.506Z',
          startDateTime: 'string',
          endDate: '2023-11-02T15:56:25.506Z',
          endDateTime: 'string',
          plannedEffort: '1h10m',
          createdAt: '2023-11-02T15:57:16.370Z',
          updatedAt: '2023-11-02T15:57:16.370Z',
        },
        {
          _id: '6543c6e0a243b44a4a950c55',
          ticketId: '6543c69da243b44a4a950c51',
          title: 'Title Name',
          description: 'Content will display here...',
          departmentId: '651bdf53beeb02bc627d6804',
          createdBy: '6543a2e91cc0455390e81254',
          assignTo: '651bdf53beeb02bc627d6805',
          status: 'Todo',
          notifyBefore: '5',
          startDate: '2023-11-02T15:56:25.506Z',
          startDateTime: 'string',
          endDate: '2023-11-02T15:56:25.506Z',
          endDateTime: 'string',
          plannedEffort: '1h10m',
          createdAt: '2023-11-02T15:57:20.598Z',
          updatedAt: '2023-11-02T15:57:20.598Z',
        },
      ],
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
