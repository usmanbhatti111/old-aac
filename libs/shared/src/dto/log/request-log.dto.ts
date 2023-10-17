import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestLogDto {
  @ApiProperty({
    example: 'User created',
  })
  description: string;
  @ApiProperty({
    example: '2023-10-16T09:38:34.888+00:00',
  })
  createdAt?: Date;
  @ApiProperty({
    example: '652d049a43065faab2b068ad',
  })
  user: string;
}

export class RequestLogsResponseDto {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    type: CreateRequestLogDto,
  })
  data: CreateRequestLogDto;

  @ApiProperty({
    example: '',
  })
  error: string;
}

