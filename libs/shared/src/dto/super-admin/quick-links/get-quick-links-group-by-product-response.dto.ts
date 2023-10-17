import { ApiProperty } from '@nestjs/swagger';

export class GetQuickLinksGroupByProductResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Quick Links Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: {
      Sales: [
        {
          _id: '6525688b50548866337ef9ac',
          productId: '651fd90c37afc24d56a3c7ea',
          moduleId: '56cb91bdc3464f14678934ca',
          logoId: '56cb91bdc3464f14678934ca',
          url: 'https://www.airapplecart.uk',
          isActive: true,
          createdBy: '56cb91bdc3464f14678934ca',
          isDeleted: false,
          createdAt: '2023-10-10T15:06:51.554Z',
          updatedAt: '2023-10-11T09:41:00.674Z',
          updatedBy: '56cb91bdc3464f14678934ca',
          productName: 'Sales',
        },
        {
          _id: '652676757439883f90ac0a7d',
          productId: '651fd90c37afc24d56a3c7ea',
          moduleId: '56cb91bdc3464f14678934ca',
          logoId: '56cb91bdc3464f14678934ca',
          url: 'https://www.airapplecart.uk',
          isActive: false,
          createdBy: '56cb91bdc3464f14678934ca',
          isDeleted: false,
          createdAt: '2023-10-11T10:18:29.584Z',
          updatedAt: '2023-10-11T10:18:29.584Z',
          productName: 'Sales',
        },
      ],
      Marketing: [
        {
          _id: '6525689c50548866337ef9ae',
          productId: '651fd9863066c8a22a9526c4',
          moduleId: '56cb91bdc3464f14678934ca',
          logoId: '56cb91bdc3464f14678934ca',
          url: 'https://www.airapplecart.uk',
          isActive: false,
          createdBy: '56cb91bdc3464f14678934ca',
          isDeleted: false,
          createdAt: '2023-10-10T15:07:08.308Z',
          updatedAt: '2023-10-11T09:18:10.446Z',
          deletedBy: '56cb91bdc3464f14678934ca',
          productName: 'Marketing',
        },
      ],
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
