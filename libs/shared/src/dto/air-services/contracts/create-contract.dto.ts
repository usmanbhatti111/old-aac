import { ApiProperty } from '@nestjs/swagger';
import {
  TicketInternalTypeEnum,
  TicketPirorityEnum,
  TicketStatusEnum,
  TicketTypeEnum,
} from '@shared/constants';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateContractDTO {
  @ApiProperty({ example: 'Microsoft' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'CNTW-6' })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({ example: 'type' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 'Dell Monitor' })
  @IsString()
  @IsNotEmpty()
  associateAssets: string;

  @ApiProperty({ example: '200' })
  @IsString()
  @IsNotEmpty()
  cost: string;

  @ApiProperty({ example: '20' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: 'draft' })
  @IsString()
  @IsNotEmpty()
  vendor: string;

  @ApiProperty({ example: '10/04/2022' })
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ example: '10/04/2022' })
  @IsString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ example: false })
  @IsString()
  @IsNotEmpty()
  autoRenew: string;

  @ApiProperty({ example: true })
  @IsString()
  @IsNotEmpty()
  notifyExpiry: string;

  @ApiProperty({ example: '651d8c552d3ef0d603ed4210' })
  @IsString()
  @IsNotEmpty()
  assetId: string;
}
