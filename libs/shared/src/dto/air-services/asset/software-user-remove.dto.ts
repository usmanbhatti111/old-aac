import { ApiProperty } from '@nestjs/swagger';

export class SoftwareUserRemoveResponse {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({
    example: 'User Remove Successfully',
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
