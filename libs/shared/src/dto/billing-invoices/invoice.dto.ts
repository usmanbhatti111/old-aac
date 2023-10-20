import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InvoiceStatusEnum } from '../../constants/enums';
import { PaginationDto } from '../common';

export class CreateInvoiceDto {
  @ApiProperty({
    example: '652dff82d73b5bebfb0ab482',
  })
  @IsMongoId()
  @IsNotEmpty()
  organizationPlanId: string;
  createdBy?: string;
}

export class UpdateInvoiceDto {
  @ApiProperty({
    example: '2023-10-20',
  })
  @IsISO8601()
  @IsNotEmpty()
  dueDate: Date;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  invoiceDiscount?: number;

  @ApiProperty({
    type: String,
    required: false,
    enum: InvoiceStatusEnum,
    example: InvoiceStatusEnum.OVERDUE,
  })
  status: InvoiceStatusEnum;

  invoiceId?: string;
  updatedBy?: string;
}

export class UpdateInvoiceIdDto {
  @ApiProperty({
    example: '652dff82d73b5bebfb0ab482',
  })
  @IsMongoId()
  @IsNotEmpty()
  invoiceId: string;
}

export class ListInvoicesDTO extends PaginationDto {
  @ApiProperty({
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty({
    example: '',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  organizationId: string;

  @ApiProperty({
    type: String,
    required: false,
    enum: InvoiceStatusEnum,
  })
  status: InvoiceStatusEnum;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsISO8601()
  @IsOptional()
  billingDate: Date;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsISO8601()
  @IsOptional()
  dueDate: Date;
}
