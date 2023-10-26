import { ApiProperty } from '@nestjs/swagger';
import { EContactMode, EDealType, ETaskPriority } from '@shared/constants';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateDealDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'Deal name',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: Number, example: 10000, required: false })
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  amount: number;

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
    enum: EDealType,
    example: EDealType.NEW,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  type: string;

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
  dealStageId: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsMongoId()
  dealPiplineId: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsMongoId()
  contactedPersonId: string;

  @ApiProperty({
    type: String,
    enum: EContactMode,
    example: EContactMode.EMAIL,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  contactMode: string;

  @ApiProperty({
    type: Date,
    required: false,
    example: new Date(),
  })
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  closeDate: Date;

  id: string;
  updatedBy: string;
  probability: number;
}
