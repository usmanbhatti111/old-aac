import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetExamplesDto {
  @ApiProperty({ required: false })
  page: number;

  @ApiProperty({ required: false })
  limit: number;
}

export class GetExamplesResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: [
      {
        title: 'Heading',
        description: 'new description',
      },
    ],
  })
  data: [];

  @ApiProperty({ example: null })
  error: string;
}
