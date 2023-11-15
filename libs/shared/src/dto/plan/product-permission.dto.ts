import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { toMongoObjectId } from '../../functions';

export class ProductPermissionDto {
  @ApiProperty({ type: String, isArray: true })
  @IsNotEmpty()
  @IsArray()
  permissionSlugs: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(toMongoObjectId, { toClassOnly: true })
  productId: string;
}
