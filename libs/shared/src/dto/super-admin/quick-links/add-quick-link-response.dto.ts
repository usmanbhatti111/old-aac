import { ApiProperty } from '@nestjs/swagger';

export class AddQuickLinkResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'A new Quick Link added' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6525717a9e2ed50450c0052a',
      productId: '56cb91bdc3464f14678934ca',
      moduleId: '56cb91bdc3464f14678934ca',
      logoId: '56cb91bdc3464f14678934ca',
      url: 'https://www.airapplecart.uk',
      isActive: false,
      createdBy: '56cb91bdc3464f14678934ca',
      isDeleted: false,
      createdAt: '2023-10-10T15:44:58.142Z',
      updatedAt: '2023-10-10T15:44:58.142Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
