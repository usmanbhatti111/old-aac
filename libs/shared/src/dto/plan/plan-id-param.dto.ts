import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { toMongoObjectId } from '../../functions';
import { Transform } from 'class-transformer';

export class PlanIdParamDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @Transform(toMongoObjectId, { toClassOnly: true })
  @IsNotEmpty()
  planId: string;
}
