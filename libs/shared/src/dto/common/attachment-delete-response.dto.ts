import { ApiProperty } from '@nestjs/swagger';

export class DeleteAttachmentResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Delete Attachment',
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
