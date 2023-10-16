import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { paginationDTO } from '../pagination/pagination.dto';

export class GetAllInvoicesDto extends paginationDTO {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;

  organizationId: string;
}

export class GetAllInvoicesResponseDto {
  @ApiProperty()
  orgId: string;

  @ApiProperty()
  products: string;

  @ApiProperty()
  dateIssued: string;

  @ApiProperty()
  Details: number;

  @ApiProperty()
  invoiceAmount: number;

  @ApiProperty()
  invoiceBalance: number;

  @ApiProperty()
  status: Date;
}

export class GetInvoiceDto {
  @ApiProperty({
    example: '65152930f50394f42cee2db3',
  })
  @IsMongoId()
  @IsNotEmpty()
  invoiceId: string;

  organizationId: string;
}

export class GetInvoiceResponseDto {
  @ApiProperty()
  orgId: string;

  @ApiProperty()
  products: string;

  @ApiProperty()
  dateIssued: string;

  @ApiProperty()
  Details: number;

  @ApiProperty()
  invoiceAmount: number;

  @ApiProperty()
  invoiceBalance: number;

  @ApiProperty()
  status: Date;
  billingDate: Date;

  assignedBy?: string;
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

  organizationId: string;
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
