import { ApiProperty } from '@nestjs/swagger';

export class AddPlanResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'A new Plan added' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6548c118e9c20128444ddb98',
      description: 'some description',
      defaultUsers: 12,
      defaultStorage: 12,
      planPrice: 12,
      additionalPerUserPrice: 12,
      planProducts: ['6523d0f009e8c90ad90dc338'],
      planProductFeatures: ['6548c118a5df59e815dc2d76'],
      planProductPermissions: ['6548c118a5df59e815dc2d79'],
      additionalStoragePrice: 12,
      planTypeId: '651bee19040d3384e81b81ff',
      createdBy: '652d0c8612be46f5da445de8',
      isDeleted: false,
      isActive: true,
      createdAt: '2023-11-06T10:34:00.891Z',
      updatedAt: '2023-11-06T10:34:00.891Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
