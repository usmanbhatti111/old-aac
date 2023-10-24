import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { IdDto, PaginationDto } from '../common';

export interface ISalesProduct {
  sku?: string;
  purchasePrice: number;
  name: string;
  category?: string;
  description?: string;
  unitPrice: number;
  fileUrl?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  isDeleted?: boolean;
}
export class CreateSalesProductDto {
  @ApiProperty({
    example: 'product name',
  })
  name: string;

  @ApiProperty({
    example: 'KHS9292',
  })
  sku?: string;

  @ApiProperty({
    example: 100,
  })
  purchasePrice: number;

  @ApiProperty({
    example: 'Hardware',
  })
  category?: string;

  @ApiProperty({
    example: 'description of product',
  })
  description?: string;

  @ApiProperty({
    example: 90.5,
  })
  unitPrice: number;

  @ApiProperty({
    example: 'www.s3/productname.pdf',
  })
  fileUrl?: string;

  @ApiProperty({
    example: true,
  })
  isActive?: boolean;

  createdBy?: string;
}

export class UpdateSalesProductDto extends CreateSalesProductDto {
  @ApiProperty({
    required: true,
    example: '65152939f50394f42cee2db4',
  })
  id?: string;

  updatedBy?: string;
}
export class SalesProductDto {
  @ApiProperty({
    example: '168927646',
    description: 'The unique identifier for the organization.',
  })
  id: string;

  @ApiProperty({
    example: 'product name',
  })
  name: string;

  @ApiProperty({
    example: 'KHS9292',
  })
  sku?: string;

  @ApiProperty({
    example: 100,
  })
  purchasePrice: number;

  @ApiProperty({
    example: 'Hardware',
  })
  category?: string;

  @ApiProperty({
    example: 'description of product',
  })
  description?: string;

  @ApiProperty({
    example: 90.5,
  })
  unitPrice: number;

  @ApiProperty({
    example: 'www.s3/productname.pdf',
  })
  fileUrl?: string;

  @ApiProperty({
    example: true,
  })
  isActive?: boolean;
}

export class SalesProductResponseDto {
  @ApiProperty({
    example: 200,
  })
  status: number;

  @ApiProperty({
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    type: SalesProductDto,
  })
  data: SalesProductDto;

  @ApiProperty({
    example: '',
  })
  error: string;
}

export class SalesProductsResponseDto {
  @ApiProperty({
    example: 200,
  })
  status: number;

  @ApiProperty({
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    type: [SalesProductDto],
  })
  data: SalesProductDto[];

  @ApiProperty({
    example: '',
  })
  error: string;
}

export class DeleteSalesProductResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({})
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}

export class DeleteSalesProductDto extends IdDto {
  deletedBy: string;
}

export class GetSalesProductsDto extends PaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Search By name or SKU or description',
  })
  @IsNotEmpty()
  @IsOptional()
  search: string;
}
