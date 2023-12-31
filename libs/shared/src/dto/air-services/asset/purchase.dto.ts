import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsNumber,
  IsString,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import {
  EPurchaseOrderStatus,
  EApprovalStatusStatus,
} from '../../../constants/enums';
import { paginationDTO } from '../../pagination/pagination.dto';
import { EMongooseDateFilter, EExportFile } from '@shared/constants';
export class PurchaseDetailDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 12,
    required: false,
  })
  costPerItem: number;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Item Name',
    required: false,
  })
  itemName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Description',
    required: false,
  })
  description: string;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 5,
    required: false,
  })
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 8,
    required: false,
  })
  taxRatio: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 10,
    required: false,
  })
  discount: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 8,
  })
  taxRate: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 8,
  })
  shipping: number;
}
export class addPurchaseOrderDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'new Order',
    required: true,
  })
  orderName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '12',
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
  })
  termAndCondition: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    type: [PurchaseDetailDto],
    required: false,
  })
  purchaseDetails: PurchaseDetailDto[];

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 123,
    required: false,
  })
  subTotal: number;
  @ApiProperty({
    enum: EPurchaseOrderStatus,
    required: false,
    example: 'ORDERED',
  })
  @IsOptional()
  status: string;
}
export class UpdatePurchaseOrderDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Purchase Edit Successfully',
  })
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
    required: false,
  })
  departmentId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'new Order',
    required: false,
  })
  termAndCondition: string;
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 123,
    required: false,
  })
  subTotal: number;
  @ApiProperty({
    enum: EPurchaseOrderStatus,
    required: false,
    example: 'ORDERED',
  })
  @IsOptional()
  status: string;
  @IsOptional()
  @IsArray()
  @ApiProperty({
    type: [PurchaseDetailDto],
    required: false,
  })
  purchaseDetails: PurchaseDetailDto[];
}
export class DeletePurchaseOrderDto {
  @ApiProperty({
    example: '651e6368a3a6baf2f193efb0',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
export class GetPurchaseResponseOrderDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '65154bdc3064871640f8ce14',
      orderName: 'nodejs dev',
      orderNumber: 'FULL_TIME',
      vendorId: '65154bdc3064871640f8ce14',
      currency: 'Pound',
      expectedDeliveryDate: '2023-09-27T12:00:00Z',
      locationId: '65154bdc3064871640f8ce14',
      departmentId: '65154bdc3064871640f8ce14',
      termAndCondition: 'new order has been sent',
      createdAt: '2023-09-27T12:00:00Z',
      updatedAt: '2023-09-27T12:00:00Z',
      status: 'NEW',
      purchaseDetails: {
        costPerItem: 12,
        itemName: 'Item Name',
        description: 'Description',
        quantity: 5,
        taxRatio: 8,
        discount: 10,
        taxRate: 8,
        shipping: 8,
      },
    },
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}
export class GetPurchasesResponseOrderDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '65154bdc3064871640f8ce14',
        orderName: 'nodejs dev',
        orderNumber: 'FULL_TIME',
        vendorId: '65154bdc3064871640f8ce14',
        currency: 'Pound',
        expectedDeliveryDate: '2023-09-27T12:00:00Z',
        locationId: '65154bdc3064871640f8ce14',
        departmentId: '65154bdc3064871640f8ce14',
        termAndCondition: 'new order has been sent',
        createdAt: '2023-09-27T12:00:00Z',
        updatedAt: '2023-09-27T12:00:00Z',
        status: 'NEW',
        purchaseDetails: {
          costPerItem: 12,
          itemName: 'Item Name',
          description: 'Description',
          quantity: 5,
          taxRatio: 8,
          discount: 10,
          taxRate: 8,
          shipping: 8,
        },
      },
    ],
  })
  data: object[];

  @ApiProperty({ example: null })
  errors: [];
}
export class GetPurchasesAssociationResponseOrderDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '65154bdc3064871640f8ce14',
        ticketId: '65154bdc3064871640f8ce14',
        createdAt: '2023-09-27T12:00:00Z',
        updatedAt: '2023-09-27T12:00:00Z',
        status: 'NEW',
      },
    ],
  })
  data: object[];

  @ApiProperty({ example: null })
  errors: [];
}

export class FilterPurchaseOrderDto extends paginationDTO {
  @IsOptional()
  @ApiProperty({
    enum: EPurchaseOrderStatus,
    required: false,
    example: 'ORDERED',
  })
  status: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78c',
  })
  vendorId: string;

  @ApiProperty({
    enum: EMongooseDateFilter,
    example: '',
    required: false,
  })
  @IsEnum(EMongooseDateFilter)
  @IsOptional()
  expectedDeliveryDate: string;

  @ApiProperty({
    enum: EMongooseDateFilter,
    example: '',
    required: false,
  })
  @IsEnum(EMongooseDateFilter)
  @IsOptional()
  createdAt: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  departmentId: string;
  @ApiProperty({
    example: 'dev',
    required: false,
  })
  @IsOptional()
  search: string;
  @ApiProperty({
    type: String,
    required: false,
    enum: EExportFile,
  })
  @IsEnum(EExportFile)
  @IsOptional()
  exportType: string;
}
export class AssociatePurchaseOrderDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  @ApiProperty({
    type: [String],
    example: [
      '652ffb62436eb52662f9752e',
      '652ffb69436eb52662f97534',
      '652ffb6a436eb52662f97536',
    ],
    required: false,
  })
  ticketsIds: [string];
}
export class DeleteAssociatePurchaseOrderDto {
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '652ffb62436eb52662f9752e',
    required: false,
  })
  associateOrderId: string;
}
export class ApproverStatusDto {
  @ApiProperty({
    required: true,
    example: '65152939f50394f42cee2db4',
  })
  @IsMongoId()
  id: string;
  @ApiProperty({
    enum: EApprovalStatusStatus,
    required: false,
  })
  @IsEnum(EApprovalStatusStatus)
  approvalStatus: string;
  @ApiProperty({
    example: 'dev',
    required: false,
  })
  @IsOptional()
  @IsString()
  reasons: string;
}
export class AddPurchaseOrderApprover {
  @ApiProperty({
    required: true,
    example: '65152939f50394f42cee2db4',
  })
  @IsMongoId()
  @IsNotEmpty()
  purchaseId: string;
}

export class FilterPurchaseOrderRecievedDto extends paginationDTO {
  @IsOptional()
  @ApiProperty({
    required: true,
    example: 'RECIEVED',
  })
  status: string;
}
