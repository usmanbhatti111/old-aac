import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class PlanIdParamDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  planId: string;
}
