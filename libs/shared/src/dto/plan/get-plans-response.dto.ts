import { ApiProperty } from '@nestjs/swagger';

export class GetPlansResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Plans Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: {
      plans: [
        {
          _id: '654a03a4968769306ef84d97',
          description: 'some description',
          defaultUsers: 12,
          defaultStorage: 12,
          planPrice: 12,
          additionalPerUserPrice: 12,
          planProducts: [
            {
              _id: '654a00ac968769306ef84d86',
              name: 'Sales',
              description: 'Manage your sales with Air Apple Cart',
              status: 'active',
              createdBy: '652d0c8612be46f5da445de8',
              isDeleted: false,
              createdAt: '2023-11-07T09:17:32.606Z',
              updatedAt: '2023-11-07T09:27:40.430Z',
              updatedBy: '652d0c8612be46f5da445de8',
            },
            {
              _id: '654a02f0968769306ef84d8a',
              name: 'marketing',
              description: 'Manage your marketing with Air Apple Cart',
              status: 'active',
              createdBy: '652d0c8612be46f5da445de8',
              isDeleted: false,
              createdAt: '2023-11-07T09:27:12.635Z',
              updatedAt: '2023-11-07T09:29:07.937Z',
              updatedBy: '652d0c8612be46f5da445de8',
            },
          ],
          additionalStoragePrice: 12,
          createdBy: '652d0c8612be46f5da445de8',
          isActive: true,
          createdAt: '2023-11-07T09:30:12.847Z',
          updatedAt: '2023-11-07T09:30:12.868Z',
          planType: {
            _id: '651bee19040d3384e81b81ff',
            name: 'Growth',
          },
        },
      ],
      meta: {
        page: 1,
        pages: 1,
        limit: 10,
        total: 1,
      },
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
