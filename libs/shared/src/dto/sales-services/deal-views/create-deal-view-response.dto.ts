import { ApiProperty } from '@nestjs/swagger';

export class CreateDealViewResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '65447c13d9154e739ea47cb5',
      name: 'My October View',
      apiUrl:
        '/deals/get-deals-list-view?dateStart=2023-10-01&dateEnd=2023-10-31',
      sharedWith: 'PRIVATE',
      createdBy: '653b47c4bb3e468fdf58c9ac',
      isDeleted: 'ACTIVE',
      createdAt: '2023-11-03T04:50:27.529Z',
      updatedAt: '2023-11-03T04:50:27.529Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
