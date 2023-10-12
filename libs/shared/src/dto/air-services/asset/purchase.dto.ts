import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsString,
} from 'class-validator';

export class AddPurchaseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'new Order',
    required: true,
  })
  orderName: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 12,
    required: true,
  })
  orderNumber: string;
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  vendorId: string;
  @IsNotEmpty()
  @IsString()
  @IsEnum(['Pound', 'Dollar'])
  @ApiProperty({
    example: 'Pound',
    required: true,
    enum: ['Pound', 'Dollar'],
  })
  currency: string;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    example: new Date().toISOString(),
  })
  expectedDeliveryDate: Date;
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  locationId: string;
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  departmentId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'new Order',
    required: true,
  })
  termAndCondition: string;
}
export class UpdatePurchaseDto {
  @ApiProperty({
    required: true,
    example: '65152939f50394f42cee2db4',
  })
  id: string;
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'new Order',
    required: false,
  })
  orderName: string;
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 12,
    required: false,
  })
  orderNumber: string;
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  vendorId: string;
  @IsOptional()
  @IsString()
  @IsEnum(['Pound', 'Dollar'])
  @ApiProperty({
    example: 'Pound',
    required: false,
    enum: ['Pound', 'Dollar'],
  })
  currency: string;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    example: new Date().toISOString(),
    required: false,
  })
  expectedDeliveryDate: string;
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  locationId: string;
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  departmentId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'new Order',
    required: true,
  })
  termAndCondition: string;
}
export class DeletePurchaseDto {
  @ApiProperty({
    example: '651e6368a3a6baf2f193efb0',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
