import { ApiProperty } from '@nestjs/swagger';

export class GetChildTicketResponse {
  @ApiProperty({ example: 202 })
  statusCode: number;
  @ApiProperty({ example: 'ChildTicket Get Successfully' })
  message: string;
  @ApiProperty({
    example: {
      tickets: [
        {
          _id: '6524286a511ac28539db7ac1',
          childTicketDetails: {
            _id: '65242885511ac28539db7ac3',
            details: {
              note: 'any note',
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
            updatedAt: '2023-10-11T12:30:22.292Z',
          },
        },
        {
          _id: '6524286a511ac28539db7ac1',
          childTicketDetails: {
            _id: '65269227769d9c7daf329147',
            details: {
              note: 'any note',
            },
            status: 'OPEN',
            subject: 'test subject',
            pirority: 'HIGH',
            type: 'INTERNAL',
            internalType: 'INTERNAL',
            associateAssets: [],
            childTicketsId: [],
            isChildTicket: true,
            createdAt: '2023-10-11T12:16:39.742Z',
            updatedAt: '2023-10-11T12:16:39.742Z',
          },
        },
        {
          _id: '6524286a511ac28539db7ac1',
          childTicketDetails: {
            _id: '652698b92af800eb613294b4',
            details: {
              note: 'any note',
            },
            status: 'OPEN',
            subject: 'test subject',
            pirority: 'HIGH',
            type: 'INTERNAL',
            internalType: 'INTERNAL',
            associateAssets: [],
            childTicketsId: [],
            isChildTicket: true,
            createdAt: '2023-10-11T12:44:41.806Z',
            updatedAt: '2023-10-11T12:44:41.806Z',
          },
        },
      ],
      meta: {
        page: 1,
        pages: 1,
        limit: 10,
        total: 3,
      },
    },
  })
  data: {};
  @ApiProperty({ example: null })
  errors: [];
}
