import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class AddQuickLinkDto {
  @ApiProperty({
    type: String,
    example: '56cb91bdc3464f14678934ca',
    required: true,
  })
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    type: String,
    example: '56cb91bdc3464f14678934ca',
    required: true,
  })
  @IsMongoId()
  @IsNotEmpty()
  moduleId: string;

  @ApiProperty({
    type: String,
    example: '56cb91bdc3464f14678934ca',
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  logoId: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'https://www.airapplecart.uk',
  })
  @IsNotEmpty()
  url: string;

  createdBy: string;
}
