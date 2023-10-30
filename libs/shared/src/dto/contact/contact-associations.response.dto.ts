import { ApiProperty } from '@nestjs/swagger';
import { paginationDTO } from '../pagination/pagination.dto';

export class ContactAssociationResponse extends paginationDTO {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Contact Association fetched successfully' })
  message: string;

  @ApiProperty({
    example: {
      tickets: {
        tickets: [
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
            childTicketsId: [
              '65242885511ac28539db7ac3',
              '65268ee64e98c3ffc7ca6abf',
              '65269227769d9c7daf329147',
            ],
            isChildTicket: false,
            createdAt: '2023-10-09T16:20:58.635Z',
            updatedAt: '2023-10-11T12:16:39.753Z',
          },
        ],
        meta: {
          page: 1,
          pages: 1,
          limit: 10,
          total: 1,
        },
      },
      deals: {
        deals: [{ _id: '6524286a511ac28539db7ac1' }],
        meta: {
          page: 1,
          pages: 1,
          limit: 10,
          total: 1,
        },
      },
      // taskes: {
      //   tasks: [
      //     {
      //       _id: '6527c1ba7f7151d4953910b2',
      //       ticketId: '651bdf53beeb02bc627d6804',
      //       title: 'Title Name',
      //       description: 'Content will display here...',
      //       workSpace: 'Content will display here...',
      //       assignTo: 'User',
      //       status: 'Status',
      //       notifyBefore: '15 Minutes',
      //       startDate: '2023-10-12T09:51:52.910Z',
      //       endDate: '2023-10-12T09:51:52.911Z',
      //       plannedEffort: '1h10m',
      //       createdAt: '2023-10-12T09:51:54.958Z',
      //       updatedAt: '2023-10-12T09:51:54.958Z',
      //     }
      //   ],
      //   meta: {
      //     page: 1,
      //     pages: 1,
      //     limit: 10,
      //     total: 1,
      //   }
      // },
      companies: {
        companies: [{ _id: '6524286a511ac28539db7ac1' }],
        meta: {
          page: 1,
          pages: 1,
          limit: 10,
          total: 1,
        },
      },
      attachments: {
        attachments: [{ _id: '6524286a511ac28539db7ac1' }],
        meta: {
          page: 1,
          pages: 1,
          limit: 10,
          total: 1,
        },
      },
      playbooks: {
        playbooks: [{ _id: '6524286a511ac28539db7ac1' }],
        meta: {
          page: 1,
          pages: 1,
          limit: 10,
          total: 1,
        },
      },
    },
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}
