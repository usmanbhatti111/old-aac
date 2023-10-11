import { ApiProperty } from '@nestjs/swagger';

export class CreateChildTicketResponse {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({
    example: 'ChildTicket Created Successfully',
  })
  message: string;
  @ApiProperty({
    example: {
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
  })
  data: {};
  @ApiProperty({ example: null })
  errors: [];
}
