import { ApiProperty } from '@nestjs/swagger';
import {
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { paginationDTO } from '../pagination/pagination.dto';
import { InvoiceStatusEnum } from '../../constants/enums';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';

export class GetAllInvoicesDto extends paginationDTO {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({
    type: String,
    required: false,
    enum: InvoiceStatusEnum,
  })
  status: InvoiceStatusEnum;

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
    required: false,
    description: '2023-10-30',
  })
  @IsISO8601()
  @IsOptional()
  billingDate: Date;

  @ApiProperty({
    required: false,
    description: '2023-11-09',
  })
  @IsISO8601()
  @IsOptional()
  dueDate: Date;

  @Transform(toMongoObjectId)
  organizationId: string;
}

export class GetAllInvoicesResponseDto {
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

export class GetInvoiceDto {
  @ApiProperty({
    type: String,
    example: '65152930f50394f42cee2db3',
  })
  @Transform(toMongoObjectId)
  @IsNotEmpty()
  invoiceId: string;

  @Transform(toMongoObjectId)
  organizationId: string;
}

export class GetInvoiceResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      organizationplans: {
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
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}
export class PayNowDto {
  @ApiProperty({
    example: '65152930f50394f42cee2db3',
  })
  @IsMongoId()
  @IsNotEmpty()
  invoiceId: string;

  @ApiProperty({
    example: '65152930f50394f42cee2db3',
  })
  @IsMongoId()
  @IsNotEmpty()
  paymentId: string;

  @Transform(toMongoObjectId)
  organizationId: string;

  @Transform(toMongoObjectId)
  userId: string;
}
export class PayNowResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: 'string',
      invoiceId: 'string',
      paymentMethodId: 'string',
      paymentAmount: 100,
      paymentDate: '2023-10-31T00:00:00.000Z',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}
