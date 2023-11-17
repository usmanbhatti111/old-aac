import { ApiProperty } from '@nestjs/swagger';

export class DeleteEnquiriesResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: '1 Record has been deleted outoff 2' })
  message: string;

  @ApiProperty({})
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
