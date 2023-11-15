import { ApiProperty } from '@nestjs/swagger';

export class GetPlanResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Plans Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: {
      statusCode: 200,
      message: 'Plan Get Successfully',
      data: {
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
        planProductFeatures: [
          {
            _id: '654a03a468586723acc355ad',
            featureId: '6548c38b4374cf583e7552a2',
            productId: '654a00ac968769306ef84d86',
            __v: 0,
            dealsAssociationsDetail: 'string',
          },
          {
            _id: '654a03a468586723acc355b5',
            featureId: '6549e68b4ec933f9eba862ca',
            productId: '654a02f0968769306ef84d8a',
            __v: 0,
            dealsAssociationsDetail: 'string',
          },
        ],
        planProductPermissions: [
          {
            _id: '654a03a468586723acc355b0',
            productId: '654a00ac968769306ef84d86',
            __v: 0,
            permissions: ['65448e2345040c7087776eb9'],
          },
          {
            _id: '654a03a468586723acc355b8',
            productId: '654a02f0968769306ef84d8a',
            __v: 0,
            permissions: ['65448e2345040c7087776ebb'],
          },
        ],
        additionalStoragePrice: 12,
        createdBy: [
          {
            _id: '652d0c8612be46f5da445de8',
            firstName: 'maarij',
            lastName: 'bhatti',
            email: 'maarij123@example.com',
            phoneNumber: '+44 2388 2399',
            cognitoId: 'c6627214-1011-70aa-6774-ce2bb6e4f996',
            role: 'ORG_ADMIN',
            products: [],
            createdBy: null,
            createdAt: '2023-10-16T10:12:22.971Z',
            updatedAt: '2023-10-16T10:12:22.971Z',
            status: 'ACTIVE',
          },
        ],
        isDeleted: false,
        isActive: true,
        createdAt: '2023-11-07T09:30:12.847Z',
        updatedAt: '2023-11-07T09:30:12.868Z',
        planType: {
          _id: '651bee19040d3384e81b81ff',
          name: 'Growth',
        },
      },
      error: null,
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
