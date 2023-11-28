import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { toMongoObjectId } from '../../functions';
import { Transform } from 'class-transformer';

export class PlanProductParamDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @Transform(toMongoObjectId, { toClassOnly: true })
  @IsNotEmpty()
  productId: string;
}
