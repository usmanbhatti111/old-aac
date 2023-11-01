import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from '../common';
import { toMongoObjectId } from '../../functions';

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

export class ListOrgPlan extends PaginationDto {
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
          _id: '652f675569b8092d9954d30b',
          organizationId: '652e0304169f73fd01fd4956',
          planId: '652677e726623bafa178e6a1',
          additionalUsers: 1,
          additionalStorage: 1,
          planDiscount: 5,
          billingCycle: 'MONTHLY',
          billingDate: '2023-10-20T00:00:00.000Z',
          status: 'ACTIVE',
          assignedBy: '652e29b8d4495132e5d8f6d0',
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
            defaultUsers: 1,
            defaultStorage: 1,
            planPrice: 10,
            additionalPerUserPrice: 10,
            planProducts: [
              '652e0073d73b5bebfb0ab48c',
              '652e007ad73b5bebfb0ab48e',
            ],
            additionalStoragePrice: 10,
            planTypeId: '651bee19040d3384e81b81ff',
            createdBy: '65262d9c3686b5e9a4fc4222',
            isDeleted: false,
            isActive: true,
          },
          plantypes: {
            _id: '651bee19040d3384e81b81ff',
            name: 'Growth',
          },
          planProducts: [
            {
              _id: '652e0073d73b5bebfb0ab48c',
              name: 'Air Services',
              createdBy: '652d19a5b5f5fc0c40275467',
            },
            {
              _id: '652e007ad73b5bebfb0ab48e',
              name: 'Air Operation',
              createdBy: '652d19a5b5f5fc0c40275467',
            },
          ],
          subtotal: 30,
          total: 28.5,
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
      _id: '652f675569b8092d9954d30b',
      organizationId: '652e0304169f73fd01fd4956',
      planId: '652677e726623bafa178e6a1',
      additionalUsers: 1,
      additionalStorage: 1,
      planDiscount: 5,
      billingCycle: 'MONTHLY',
      billingDate: '2023-10-20T00:00:00.000Z',
      status: 'ACTIVE',
      assignedBy: '652e29b8d4495132e5d8f6d0',
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
        defaultUsers: 1,
        defaultStorage: 1,
        planPrice: 10,
        additionalPerUserPrice: 10,
        planProducts: ['652e0073d73b5bebfb0ab48c', '652e007ad73b5bebfb0ab48e'],
        additionalStoragePrice: 10,
        planTypeId: '651bee19040d3384e81b81ff',
        createdBy: '65262d9c3686b5e9a4fc4222',
        isDeleted: false,
        isActive: true,
      },
      plantypes: {
        _id: '651bee19040d3384e81b81ff',
        name: 'Growth',
      },
      planProducts: [
        {
          _id: '652e0073d73b5bebfb0ab48c',
          name: 'Air Services',
          createdBy: '652d19a5b5f5fc0c40275467',
        },
        {
          _id: '652e007ad73b5bebfb0ab48e',
          name: 'Air Operation',
          createdBy: '652d19a5b5f5fc0c40275467',
        },
      ],
      subtotal: 30,
      total: 28.5,
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}
export class FindPlanDTO {
  @ApiProperty({
    type: String,
    required: true,
    example: '',
  })
  @IsNotEmpty()
  @Transform(toMongoObjectId)
  productId: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '',
  })
  @IsNotEmpty()
  @Transform(toMongoObjectId)
  planTypeId: string;
}
export class FindPlanDTOResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {},
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
      organizationplans: {
        _id: '652f675569b8092d9954d30b',
        organizationId: '652e0304169f73fd01fd4956',
        planId: '652677e726623bafa178e6a1',
        additionalUsers: 1,
        additionalStorage: 1,
        planDiscount: 5,
        billingCycle: 'MONTHLY',
        billingDate: '2023-10-20T00:00:00.000Z',
        status: 'ACTIVE',
        assignedBy: '652e29b8d4495132e5d8f6d0',
        isDeleted: false,
        createdAt: '2023-10-18T05:04:21.346Z',
        updatedAt: '2023-10-18T05:04:35.489Z',
        __v: 0,
      },
      plans: {
        _id: '652677e726623bafa178e6a1',
        description: 'Plan A',
        defaultUsers: 1,
        defaultStorage: 1,
        planPrice: 10,
        additionalPerUserPrice: 10,
        planProducts: ['652e0073d73b5bebfb0ab48c', '652e007ad73b5bebfb0ab48e'],
        planProductFeatures: [
          '652650601a6e84f64e08ca4f',
          '652650601a6e84f64e08ca58',
        ],
        planProductModulePermissions: [
          '652650601a6e84f64e08ca50',
          '652650601a6e84f64e08ca59',
        ],
        additionalStoragePrice: 10,
        planTypeId: '651bee19040d3384e81b81ff',
        createdBy: '65262d9c3686b5e9a4fc4222',
        isDeleted: false,
        isActive: true,
        createdAt: '2023-10-11T10:24:39.025Z',
        updatedAt: '2023-10-11T10:24:39.057Z',
      },
    },
  })
  data: object[];

  @ApiProperty({ example: null })
  error: string;
}
