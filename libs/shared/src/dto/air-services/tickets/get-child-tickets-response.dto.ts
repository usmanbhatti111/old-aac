import { ApiProperty } from '@nestjs/swagger';

export class GetChildTicketResponse {
  @ApiProperty({ example: 202 })
  statusCode: number;
  @ApiProperty({ example: 'ChildTicket Get Successfully' })
  message: string;
  @ApiProperty({
    example: [
      {
        _id: '6524286a511ac28539db7ac1',
        details: {
          note: 'any note',
        },
        status: 'OPEN',
        subject: 'test subject',
        pirority: 'HIGH',
        type: 'INTERNAL',
        internalType: 'INTERNAL',
        associateAssets: [],
        childTicketsId: ['65242885511ac28539db7ac3'],
        isChildTicket: false,
        createdAt: '2023-10-09T16:20:58.635Z',
        updatedAt: '2023-10-09T16:21:25.583Z',
        childTicketDetails: [
          {
            _id: '65242885511ac28539db7ac3',
            details: {
              note: 'any note asdfasdf',
            },
            status: 'OPEN',
            subject: 'test subject',
            pirority: 'HIGH',
            type: 'INTERNAL',
            internalType: 'INTERNAL',
            associateAssets: [],
            childTicketsId: [],
            isChildTicket: true,
            createdAt: '2023-10-09T16:21:25.576Z',
            updatedAt: '2023-10-09T12:32:54.382Z',
          },
        ],
      },
    ],
  })
  data: [];
  @ApiProperty({ example: null })
  errors: [];
}
