import { ApiProperty } from '@nestjs/swagger';

export class GetCustomizedColumnsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '655462e69504c030d3724e94',
      userId: '653b47c4bb3e468fdf58c9ac',
      type: 'deals',
      isDeleted: false,
      columns: [],
      createdAt: '2023-11-15T06:19:18.907Z',
      updatedAt: '2023-11-15T06:19:18.907Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
