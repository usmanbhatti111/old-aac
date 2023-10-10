import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class EditPlanDto {
  @ApiProperty()
  @IsOptional()
  product_id: string;

  @ApiProperty({
    type: String,
    isArray: true,
  })
  @IsOptional()
  suite: string[];

  @ApiProperty({
    required: true,
  })
  @IsMongoId()
  @IsOptional()
  plan_type_id: string;

  @ApiProperty({
    example: 'some description',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    required: true,
    example: 12,
    type: Number,
  })
  @IsOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  default_users: number;

  @ApiProperty({
    required: true,
    example: 12,
  })
  @IsOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  default_storage: number;

  @ApiProperty({
    required: true,
    example: 12,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  plan_price: number;

  @ApiProperty({
    example: 12,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  additional_per_user_price: number;

  @ApiProperty({
    example: 12,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  additional_storage_price: number;

  plan_id: string;
}
