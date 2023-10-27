import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { toMongoObjectId } from '../../functions';

export class ProductModuleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(toMongoObjectId, { toClassOnly: true })
  moduleId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @Transform(toMongoObjectId, { toClassOnly: true })
  modulePermissionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(toMongoObjectId, { toClassOnly: true })
  productId: string;
}
