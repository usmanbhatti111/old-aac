import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class EditQuickLinkDto {
  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  isActive: boolean;

  @ApiProperty({
    type: String,
    example: '56cb91bdc3464f14678934ca',
    required: false,
  })
  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  productId: string;

  @ApiProperty({
    type: String,
    example: '56cb91bdc3464f14678934ca',
    required: false,
  })
  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
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
    required: false,
    example: 'https://www.airapplecart.uk',
  })
  @IsNotEmpty()
  @IsOptional()
  url: string;

  updatedBy: string;
  id: string;
}
