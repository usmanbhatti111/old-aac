import { ApiProperty } from '@nestjs/swagger';

export class DeleteContactStatusResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({})
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
