import { ApiProperty } from '@nestjs/swagger';

export class UpdateManyTicketResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'update',
  })
  message: string;
  @ApiProperty({
    example: {
      acknowledged: true,
      modifiedCount: 2,
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: 2,
    },
  })
  data: {};
  @ApiProperty({ example: null })
  errors: [];
}
