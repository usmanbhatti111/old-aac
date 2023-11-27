import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { InvoiceStatusEnum } from '../../constants/enums';
import { PaginationDto } from '../common';
import { toMongoObjectId } from '../../functions';

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
  })
  @IsOptional()
  @Transform(toMongoObjectId)
  organizationPlanId: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @Transform(toMongoObjectId)
  planId: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @Transform(toMongoObjectId)
  productId: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @Transform(toMongoObjectId)
  planTypeId: string;

  @ApiProperty({
    type: String,
    required: false,
    enum: InvoiceStatusEnum,
  })
  status: InvoiceStatusEnum;

  @ApiProperty({
    required: false,
    description: '2023-10-30',
  })
  @IsISO8601()
  @IsOptional()
  billingDate: Date;

  @ApiProperty({
    required: false,
    description: '2023-11-30',
  })
  @IsISO8601()
  @IsOptional()
  dueDate: Date;
}

export class ListInvoicesResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      organizationplans: [
        {
          _id: '653217a10c7f211c2c33b0d4',
          organizationPlanId: '652f675569b8092d9954d30b',
          organizationId: '652e0304169f73fd01fd4956',
          planId: '652677e726623bafa178e6a1',
          details: {
            _id: '652f675569b8092d9954d30b',
            organizationId: '652e0304169f73fd01fd4956',
            planId: '652677e726623bafa178e6a1',
            additionalUsers: 1,
            additionalStorage: 1,
            planDiscount: 0,
            billingCycle: 'MONTHLY',
            billingDate: '2023-10-20T00:00:00.000Z',
            status: 'ACTIVE',
            plans: {
              description: 'Plan A',
              defaultUsers: 1,
              defaultStorage: 1,
              planPrice: 10,
              additionalPerUserPrice: 10,
              additionalStoragePrice: 10,
              planTypeId: '651bee19040d3384e81b81ff',
            },
            plantypes: 'Growth',
          },
          invoiceNo: 'DOC-7874',
          billingDate: '2023-10-20T00:00:00.000Z',
          dueDate: '2023-10-20T00:00:00.000Z',
          subTotal: 30,
          invoiceDiscount: 0,
          afterDiscountAmout: 30,
          vat: 10,
          total: 27,
          createdBy: '652e29b8d4495132e5d8f6d0',
          status: 'PENDING',
          isDeleted: false,
          createdAt: '2023-10-20T06:01:05.203Z',
          updatedAt: '2023-10-20T06:01:05.203Z',
          organizations: {
            _id: '652e0304169f73fd01fd4956',
            registrationNumber: '8C68902',
            name: 'Orcalo Holdings',
            email: 'oh@gmail.com',
            phoneNo: '++13432121',
            address: 'Street#234 ',
            postCode: 'CN789',
            isDeleted: false,
            createdAt: '2023-10-17T03:44:04.207Z',
            updatedAt: '2023-10-17T03:44:04.207Z',
          },
          plans: {
            _id: '652677e726623bafa178e6a1',
            description: 'Plan A',
          },
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
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class GenerateInvoicesResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6535f8900b9e8c511c46fb2d',
      organizationPlanId: '652f675569b8092d9954d30b',
      organizationId: '652e0304169f73fd01fd4956',
      planId: '652677e726623bafa178e6a1',
      details: {
        _id: '652f675569b8092d9954d30b',
        organizationId: '652e0304169f73fd01fd4956',
        planId: '652677e726623bafa178e6a1',
        additionalUsers: 1,
        additionalStorage: 1,
        planDiscount: 5,
        billingCycle: 'MONTHLY',
        billingDate: '2023-10-20T00:00:00.000Z',
        status: 'ACTIVE',
        organizations: {
          name: 'Orcalo Holdings',
          email: 'oh@gmail.com',
          phoneNo: '++13432121',
          address: 'Street#234 ',
          postCode: 'CN789',
        },
        plans: {
          description: 'Plan A',
          defaultUsers: 1,
          defaultStorage: 1,
          planPrice: 10,
          additionalPerUserPrice: 10,
          additionalStoragePrice: 10,
          planTypeId: '651bee19040d3384e81b81ff',
        },
        plantypes: 'Growth',
      },
      invoiceNo: 'DOC-432',
      billingDate: '2023-10-20T00:00:00.000Z',
      dueDate: '2023-10-20T00:00:00.000Z',
      subTotal: 30,
      invoiceDiscount: 0,
      afterDiscountAmout: 30,
      vat: 10,
      total: 27,
      createdBy: '652e29b8d4495132e5d8f6d0',
      status: 'PENDING',
      isDeleted: false,
      createdAt: '2023-10-23T04:37:36.931Z',
      updatedAt: '2023-10-23T04:37:36.931Z',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}
