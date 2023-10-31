import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { toMongoObjectId } from '../../functions';

export class ProductFeatureDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  dealsAssociationsDetail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(toMongoObjectId, { toClassOnly: true })
  featureId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(toMongoObjectId, { toClassOnly: true })
  productId: string;
}
