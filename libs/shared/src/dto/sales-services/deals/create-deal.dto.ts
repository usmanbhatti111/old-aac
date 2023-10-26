import { ApiProperty } from '@nestjs/swagger';
import { EBillingFrequency, ETaskPriority } from '@shared/constants';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDealDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Deal name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsNotEmpty()
  @IsMongoId()
  dealPiplineId: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsNotEmpty()
  @IsMongoId()
  dealStageId: string;

  @ApiProperty({ type: Number, example: 10000, required: false })
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  amount: number;

  @ApiProperty({
    type: Date,
    required: false,
    example: new Date(),
  })
  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  closeDate: Date;

  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsMongoId()
  dealOwnerId: string;

  @ApiProperty({
    type: String,
    enum: ETaskPriority,
    example: ETaskPriority.LOW,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  priority: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsMongoId()
  addLineItemId: string;

  @ApiProperty({
    type: String,
    enum: EBillingFrequency,
    example: EBillingFrequency.MONTHLY,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  billingFrequency: string;

  createdBy: string;
  probability: number;
}
