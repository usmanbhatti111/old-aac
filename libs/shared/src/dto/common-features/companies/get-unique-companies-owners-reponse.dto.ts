import { ApiProperty } from '@nestjs/swagger';

export class GetUniqueCompaniesOwnersDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Get Success' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '653b47c4bb3e468fdf58c9ac',
        name: ' Dianne malik Russell',
      },
      {
        _id: '65488ce0ff900ee743130657',
        name: ' Super Admin',
      },
    ],
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
