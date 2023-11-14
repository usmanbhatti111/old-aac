import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { toMongoObjectId } from '../../functions';

class FeatureDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  dealsAssociationsDetail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(toMongoObjectId, { toClassOnly: true })
  featureId: string;
}

export class ProductFeatureDto {
  @ApiProperty({ type: FeatureDto, isArray: true })
  @IsNotEmpty()
  @IsArray()
  features: FeatureDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(toMongoObjectId, { toClassOnly: true })
  productId: string;
}
