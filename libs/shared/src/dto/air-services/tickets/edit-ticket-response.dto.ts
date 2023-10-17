import { ApiProperty } from '@nestjs/swagger';

export class EditTicketResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Ticket Edit Successfully',
  })
  message: string;
  @ApiProperty({
    example: {
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
  })
  data: {};
  @ApiProperty({ example: null })
  errors: [];
}
