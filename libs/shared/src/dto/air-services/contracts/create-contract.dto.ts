import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsBoolean, IsISO8601, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContractDTO {
  @ApiProperty({ example: 'contract name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'CNTW-6' })
  @IsString()
  @IsNotEmpty()
  contractNumber: string;

  @ApiProperty({ example: '651d72b06c9932a97b031a34' })
  @IsMongoId()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    type: [String],
    example: ['651d72b06c9932a97b031a34'],
  })
  @ArrayNotEmpty()
  associateAssets: string;

  @ApiProperty({ type: Number, example: 200 })
  @IsNumber()
  @IsOptional()
  cost: string;

  @ApiProperty({ example: '651d72b06c9932a97b031a34' })
  @IsMongoId()
  @IsOptional()
  vendor: string;

  @ApiProperty({ example: new Date().toISOString().slice(0, 10) })
  @IsISO8601()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ example: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 10) })
  @IsISO8601()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  autoRenew: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  notifyExpiry: boolean;

  @ApiProperty({ example: '651d72b06c9932a97b031a34' })
  @IsMongoId()
  @IsOptional()
  assetId: string;
}
