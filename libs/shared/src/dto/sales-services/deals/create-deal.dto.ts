import { ApiProperty } from '@nestjs/swagger';
import { EBillingFrequency, ETaskPriority } from '@shared/constants';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { toMongoObjectId } from 'libs/shared/src/functions';

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
  @Transform(toMongoObjectId)
  dealPiplineId: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsNotEmpty()
  @Transform(toMongoObjectId)
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
  @Transform(toMongoObjectId)
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
  @Transform(toMongoObjectId)
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
