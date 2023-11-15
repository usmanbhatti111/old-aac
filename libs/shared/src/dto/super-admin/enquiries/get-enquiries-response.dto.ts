import { ApiProperty } from '@nestjs/swagger';

export class GetEnquiriesResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'News and Events Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: {
      enquiries: [
        {
          _id: '6549d19f459206444a324ea9',
          query: 'Issue in Sales Service',
          status: 'pending',
          createdBy: {
            _id: '65488ce0ff900ee743130657',
            name: 'Super Admin',
            companyName: '',
            email: 'testsuperadmin4@example.com',
            phoneNumber: '+44 2388 2399',
          },
          isDeleted: false,
          createdAt: '2023-11-07T05:56:47.936Z',
          updatedAt: '2023-11-07T05:56:47.936Z',
        },
        {
          _id: '6549c4e28114ce9113606693',
          query: 'Looking for your sales products',
          status: 'done',
          createdBy: {
            _id: '653b47c4bb3e468fdf58c9ac',
            name: 'Dianne Russell',
            companyName: '',
            email: 'diannerussell@orgadmin.com',
            phoneNumber: '+44 2388 2399',
          },
          isDeleted: false,
          createdAt: '2023-11-07T05:02:26.487Z',
          updatedAt: '2023-11-07T05:53:33.392Z',
          comment: 'Reply of Looking for your sales products',
          updatedBy: '65488ce0ff900ee743130657',
          deletedBy: '65488ce0ff900ee743130657',
        },
      ],
      meta: {
        page: 1,
        pages: 1,
        limit: 10,
        total: 2,
      },
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
