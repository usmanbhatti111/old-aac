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
          _id: '65265060b3f1860c66c7adce',
          description: 'some description',
          defaultUsers: 12,
          defaultStorage: 12,
          planPrice: 12,
          additionalPerUserPrice: 12,
          planProducts: [
            '6524d340be1197f49712edb9',
            '6523d0f009e8c90ad90dc338',
          ],
          planProductFeatures: [
            '652650601a6e84f64e08ca4f',
            '652650601a6e84f64e08ca58',
          ],
          planProductModulePermissions: [
            '652650601a6e84f64e08ca50',
            '652650601a6e84f64e08ca59',
          ],
          additionalStoragePrice: 12,
          planTypeId: '6524d3695bf6cc10405eaf2d',
          createdBy: '65262d9c3686b5e9a4fc4222',
          isActive: true,
          createdAt: '2023-10-11T07:36:00.932Z',
          updatedAt: '2023-10-11T07:36:00.964Z',
          planType: [
            {
              _id: '6524d3695bf6cc10405eaf2d',
            },
          ],
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
