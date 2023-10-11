import { ApiProperty } from '@nestjs/swagger';

export class DeleteProductFeaturesResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: '2 Records has been deleted out off 2' })
  message: string;

  @ApiProperty({ example: null })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
