import { ApiProperty } from '@nestjs/swagger';
import { ETaxApplyOn } from '@shared/constants';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { toMongoObjectId } from 'libs/shared/src/functions';

export class AddTaxDto {
  @ApiProperty({
    type: String,
    example: 'VAT',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 7.5,
  })
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  percentage: number;

  @ApiProperty({
    type: [String],
    isArray: true,
    enum: ETaxApplyOn,
    example: [ETaxApplyOn.PRODUCTS, ETaxApplyOn.INVOICE],
    required: false,
  })
  @IsNotEmpty()
  @IsArray()
  applyOn: string[];

  @ApiProperty({
    type: String,
    example: 'VAT tax description',
    required: true,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Transform(toMongoObjectId)
  createdBy: string;
}
