import { ApiProperty } from '@nestjs/swagger';

export class DeleteChildTicketResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'ChildTicket Deleted Successfully',
  })
  message: string;
  @ApiProperty({
    example: {
      acknowledged: true,
      deletedCount: 1,
    },
  })
  data: {};
  @ApiProperty({ example: null })
  errors: [];
}
