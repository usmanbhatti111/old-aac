import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateInvoiceDto {
  @ApiProperty({
    example: '',
  })
  @IsMongoId()
  @IsNotEmpty()
  organizationPlanId: string;

  @ApiProperty({
    example: '',
  })
  @IsISO8601()
  @IsNotEmpty()
  dueDate;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  billingCycle;

  @ApiProperty({
    example: '',
  })
  @IsMongoId()
  @IsNotEmpty()
  planId;

  @ApiProperty({
    example: '',
  })
  @IsMongoId()
  @IsNotEmpty()
  productId;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  productName;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  planType;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  planPrice;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  defaultUsers;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  defaultStorage;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  unitUserCost;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  unitStorageCost;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  additionalUsers;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  additionalStorage;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  subTotal;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  planDiscount;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  tax;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  invoiceDiscount?: number;

  createdBy?: string;
}
