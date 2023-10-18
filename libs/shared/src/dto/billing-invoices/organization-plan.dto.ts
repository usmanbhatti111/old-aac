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

export class AssignOrgPlanDto {
  @ApiProperty({
    example: '652e0304169f73fd01fd4956',
  })
  @IsMongoId()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({
    example: '652677e726623bafa178e6a1',
  })
  @IsMongoId()
  @IsNotEmpty()
  planId: string;

  @ApiProperty({
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  additionalUsers?: number;

  @ApiProperty({
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  additionalStorage?: number;

  @ApiProperty({
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  planDiscount?: number;

  @ApiProperty({
    example: 'MONTHLY',
  })
  @IsOptional()
  @IsString()
  billingCycle: string;

  @ApiProperty({
    example: '2023-10-30',
  })
  @IsISO8601()
  @IsNotEmpty()
  billingDate: Date;

  assignedBy?: string;
}

export class ListOrgPlan {
  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @ApiProperty({ example: 10, required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number;

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
    example: '',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  productId: string;

  @ApiProperty({
    example: '',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  planTypeId: string;
}

export class AssignOrgPlanResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      id: '651e6657364160a7fca7921e',
      organizationId: '57152930f50394f71cxz2cd7',
      planId: '31172930f50394f42cee4da5',
      additionalUsers: 2,
      additionalStorage: 5,
      planDiscount: 10,
      billingCycle: 'MONTHLY',
      billingDate: '2023-12-12T00:00:00.000+00:00',
      status: 'ACTIVE',
      assignedBy: '65152930f50394f42cee2db3',
      created_at: '2023-10-05T07:31:35.099+00:00',
      updated_at: '2023-10-05T07:31:35.099+00:00',
      deleted_at: '2023-10-05T07:31:35.099+00:00',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class ListOrgPlanResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      organizationplans: [
        {
          _id: '65237f4a972203079f83918c',
          organizationId: '651e6b916318ccd41e81e7a4',
          planId: '651e6b916318ccd41e81e7a4',
          additionalUsers: 2,
          additionalStorage: 5,
          planDiscount: 10,
          billingCycle: 'MONTHLY',
          billingDate: '2023-12-11T00:00:00.000Z',
          status: 'ACTIVE',
          assignedBy: [],
          createdAt: '2023-10-09T04:19:22.308Z',
          updatedAt: '2023-10-09T04:19:22.308Z',
          __v: 0,
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

export class GetOrgPlanResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '65237f4a972203079f83918c',
      organizationId: '651e6b916318ccd41e81e7a4',
      planId: '651e6b916318ccd41e81e7a4',
      additionalUsers: 2,
      additionalStorage: 5,
      planDiscount: 10,
      billingCycle: 'MONTHLY',
      billingDate: '2023-12-11T00:00:00.000Z',
      status: 'ACTIVE',
      assignedBy: [],
      createdAt: '2023-10-09T04:19:22.308Z',
      updatedAt: '2023-10-09T04:19:22.308Z',
      __v: 0,
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class BillingDetailsDto {
  @ApiProperty({
    example: '65152930f50394f42cee2db3',
  })
  @IsMongoId()
  @IsNotEmpty()
  organizationPlanId: string;
}

export class BillingDetailsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '652e59d289e8854e1d24c00b',
        organizationPlanId: '652dff82d73b5bebfb0ab482',
        planId: '652677e726623bafa178e6a1',
        organizationplans: {
          _id: '652dff82d73b5bebfb0ab482',
          organizationId: '652e0304169f73fd01fd4956',
          planId: '652677e726623bafa178e6a1',
          additionalUsers: 0,
          additionalStorage: 0,
          planDiscount: 0,
          billingCycle: 'MONTHLY',
          billingDate: '2023-09-30T00:00:00.000Z',
          status: 'ACTIVE',
          assignedBy: '65152930f50394f42cee2db3',
          isDeleted: false,
          createdAt: '2023-10-17T03:29:06.199Z',
          updatedAt: '2023-10-17T03:29:06.199Z',
          __v: 0,
        },
        plans: {
          _id: '652677e726623bafa178e6a1',
          description: 'Plan A',
          defaultUsers: 12,
          defaultStorage: 12,
          planPrice: 12,
          additionalPerUserPrice: 12,
          planProducts: [
            '652e0073d73b5bebfb0ab48c',
            '652e007ad73b5bebfb0ab48e',
          ],
          planProductFeatures: [
            '652650601a6e84f64e08ca4f',
            '652650601a6e84f64e08ca58',
          ],
          planProductModulePermissions: [
            '652650601a6e84f64e08ca50',
            '652650601a6e84f64e08ca59',
          ],
          additionalStoragePrice: 12,
          planTypeId: '651bee19040d3384e81b81ff',
          createdBy: '65262d9c3686b5e9a4fc4222',
          isDeleted: false,
          isActive: true,
          createdAt: '2023-10-11T10:24:39.025Z',
          updatedAt: '2023-10-11T10:24:39.057Z',
        },
      },
    ],
  })
  data: object[];

  @ApiProperty({ example: null })
  error: string;
}

export class AddDiscountDto {
  @ApiProperty({
    example: '65152930f50394f42cee2db3',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: Number,
    required: false,
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  invoiceDiscount?: number;
}

export class AddDiscountResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      id: '651e6657364160a7fca7921e',
      organizationId: '57152930f50394f71cxz2cd7',
      planId: '31172930f50394f42cee4da5',
      additionalUsers: 2,
      additionalStorage: 5,
      planDiscount: 10,
      billingCycle: 'MONTHLY',
      billingDate: '2023-12-12T00:00:00.000+00:00',
      status: 'ACTIVE',
      assignedBy: '65152930f50394f42cee2db3',
      created_at: '2023-10-05T07:31:35.099+00:00',
      updated_at: '2023-10-05T07:31:35.099+00:00',
      deleted_at: '2023-10-05T07:31:35.099+00:00',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}
